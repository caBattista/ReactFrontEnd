import * as React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, ColumnMenu } from '@/components/low_level/table'
// Button/MoreVertical are used by the table's ColumnMenu; not required here.

type MyDataRow = { tag: string; name: string; value: string }

export default function MyData() {

  // const rows = React.useMemo<MyDataRow[]>(() => {
  //   const tags = ['Alpha', 'Beta', 'Gamma', 'Delta']
  //   return Array.from({ length: 200 }).map((_, i) => ({
  //     tag: tags[i % tags.length],
  //     name: `Row ${i + 1}`,
  //     value: `Content ${((i * 13) % 50) + 1}`,
  //   }))
  // }, [])

  // rows are loaded from a REST API. The endpoint is assumed to return
  // an array of MyDataRow objects: [{ tag, name, value }, ...]
  const [rows, setRows] = React.useState<MyDataRow[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch rows from server on mount. You can pass query params by
  // modifying the URL below or by adding a parameter to this effect.
  React.useEffect(() => {
    const ac = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('http://localhost:8082/api/employees', { 
          method: 'GET',
          // credentials: 'include',
          signal: ac.signal })
        
        if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`)
          console.log('Fetch json:', await res.json())
        const data = (await res.json()) as MyDataRow[]
        setRows(data)
      } catch (e: any) {
        if (e.name !== 'AbortError') setError(e.message ?? String(e))
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => ac.abort()
  }, [])

  const [filters, setFilters] = React.useState<{ tag: string | string[]; name: string | string[]; value: string | string[] }>({ tag: '', name: '', value: '' })
  const [sortKey, setSortKey] = React.useState<keyof MyDataRow | null>(null)
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc')
  const [openMenu, setOpenMenu] = React.useState<keyof MyDataRow | null>(null)
  const uniqueValues = React.useMemo(() => {
    const tag = Array.from(new Set(rows.map((r) => r.tag))).sort()
    const name = Array.from(new Set(rows.map((r) => r.name))).sort()
    const value = Array.from(new Set(rows.map((r) => r.value))).sort()
    return { tag, name, value }
  }, [rows])

  // legacy text filter helpers removed — ColumnMenu will handle selection via `onApplySelection`.

  const sortAsc = (col: keyof MyDataRow) => () => {
    setSortKey(col)
    setSortDir('asc')
    setOpenMenu(null)
  }

  const sortDesc = (col: keyof MyDataRow) => () => {
    setSortKey(col)
    setSortDir('desc')
    setOpenMenu(null)
  }

  const filteredSorted = React.useMemo(() => {
    function matchesFilter(colFilter: string | string[], cellValue: string) {
      if (Array.isArray(colFilter)) {
        if (colFilter.length === 0) return true
        return colFilter.map((s) => s.toLowerCase()).includes(String(cellValue).toLowerCase())
      }
      const t = String(colFilter).trim().toLowerCase()
      return t ? String(cellValue).toLowerCase().includes(t) : true
    }

    let r = rows.filter((row) =>
      matchesFilter(filters.tag, row.tag) &&
      matchesFilter(filters.name, row.name) &&
      matchesFilter(filters.value, row.value)
    )
    if (sortKey) {
      r = [...r].sort((a, b) => {
        const av = String(a[sortKey]).toLowerCase()
        const bv = String(b[sortKey]).toLowerCase()
        if (av < bv) return sortDir === 'asc' ? -1 : 1
        if (av > bv) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return r
  }, [rows, filters, sortKey, sortDir])

  // Move ColumnMenu to a stable component (defined below) to avoid remounting
  // on every parent render which caused the input to lose focus after each keystroke.

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-col-menu-root]')) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground"></div>
      <div className="flex-1 min-h-0 rounded-md border" data-col-menu-root>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>Tag</span>
                  <ColumnMenu
                    col="tag"
                    openMenu={openMenu as any}
                    setOpenMenu={(v: string | null) => setOpenMenu(v as unknown as keyof MyDataRow | null)}
                    values={uniqueValues.tag}
                    selectedValues={Array.isArray(filters.tag) ? filters.tag : []}
                    onApplySelection={(selected: string[]) => {
                      setFilters((f) => ({ ...f, tag: selected }))
                      setOpenMenu(null)
                    }}
                    sortAsc={sortAsc}
                    sortDesc={sortDesc}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <ColumnMenu
                    col="name"
                    openMenu={openMenu as any}
                    setOpenMenu={(v: string | null) => setOpenMenu(v as unknown as keyof MyDataRow | null)}
                    values={uniqueValues.name}
                    selectedValues={Array.isArray(filters.name) ? filters.name : []}
                    onApplySelection={(selected: string[]) => {
                      setFilters((f) => ({ ...f, name: selected }))
                      setOpenMenu(null)
                    }}
                    sortAsc={sortAsc}
                    sortDesc={sortDesc}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>Value</span>
                  <ColumnMenu
                    col="value"
                    openMenu={openMenu as any}
                    setOpenMenu={(v: string | null) => setOpenMenu(v as unknown as keyof MyDataRow | null)}
                    values={uniqueValues.value}
                    selectedValues={Array.isArray(filters.value) ? filters.value : []}
                    onApplySelection={(selected: string[]) => {
                      setFilters((f) => ({ ...f, value: selected }))
                      setOpenMenu(null)
                    }}
                    sortAsc={sortAsc}
                    sortDesc={sortDesc}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSorted.map((row, i) => (
              <TableRow key={`${row.tag}-${row.name}-${i}`}>
                <TableCell>{row.tag}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>{filteredSorted.length} rows</TableCaption>
        </Table>
      </div>
    </div>
  )
}




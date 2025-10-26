import * as React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/low_level/table'
import { Button } from '@/components/low_level/button'
import { MoreVertical } from 'lucide-react'

type MyDataRow = { tag: string; name: string; value: string }

export default function MyData() {
  const rows = React.useMemo<MyDataRow[]>(() => {
    const tags = ['Alpha', 'Beta', 'Gamma', 'Delta']
    return Array.from({ length: 200 }).map((_, i) => ({
      tag: tags[i % tags.length],
      name: `Row ${i + 1}`,
      value: `Content ${((i * 13) % 50) + 1}`,
    }))
  }, [])

  const [filters, setFilters] = React.useState<{ tag: string; name: string; value: string }>({ tag: '', name: '', value: '' })
  const [sortKey, setSortKey] = React.useState<keyof MyDataRow | null>(null)
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc')
  const [openMenu, setOpenMenu] = React.useState<keyof MyDataRow | null>(null)
  const [tempFilter, setTempFilter] = React.useState<string>('')

  const applyFilter = (col: keyof MyDataRow) => () => {
    setFilters((f) => ({ ...f, [col]: tempFilter }))
    setOpenMenu(null)
  }

  const clearFilter = (col: keyof MyDataRow) => () => {
    setFilters((f) => ({ ...f, [col]: '' }))
    setOpenMenu(null)
  }

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
    const f = {
      tag: filters.tag.trim().toLowerCase(),
      name: filters.name.trim().toLowerCase(),
      value: filters.value.trim().toLowerCase(),
    }
    let r = rows.filter((row) =>
      (f.tag ? row.tag.toLowerCase().includes(f.tag) : true) &&
      (f.name ? row.name.toLowerCase().includes(f.name) : true) &&
      (f.value ? row.value.toLowerCase().includes(f.value) : true)
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

  function ColumnMenu({ col }: { col: keyof MyDataRow }) {
    const [localOpen, setLocalOpen] = React.useState(false)
    const toggleMenu = () => {
      const next = !localOpen
      setLocalOpen(next)
      setOpenMenu(next ? col : null)
      setTempFilter(filters[col])
    }
    React.useEffect(() => {
      if (openMenu !== col) setLocalOpen(false)
    }, [openMenu, col])
    return (
      <div className="relative inline-block" data-col-menu-root>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMenu}>
          <MoreVertical />
        </Button>
        {openMenu === col ? (
          <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border bg-background p-2 shadow-sm">
            <div className="px-2 py-1.5 text-xs text-muted-foreground">{`Column: ${String(col)}`}</div>
            <div className="flex items-center gap-2 px-2 py-2">
              <input
                value={tempFilter}
                onChange={(e) => setTempFilter(e.target.value)}
                placeholder="Filter contains..."
                className="h-8 w-full rounded-md border px-2 text-xs bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 px-2 pb-2">
              <Button size="sm" variant="outline" onClick={applyFilter(col)}>Apply</Button>
              <Button size="sm" variant="ghost" onClick={clearFilter(col)}>Clear</Button>
            </div>
            <div className="h-px bg-border mx-2 my-1" />
            <div className="flex items-center gap-2 px-2 pb-1">
              <Button size="sm" variant="ghost" onClick={sortAsc(col)}>Sort asc</Button>
              <Button size="sm" variant="ghost" onClick={sortDesc(col)}>Sort desc</Button>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

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
      <div className="flex-1 min-h-0 rounded-md border overflow-auto" data-col-menu-root>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>Tag</span>
                  <ColumnMenu col="tag" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <ColumnMenu col="name" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span>Value</span>
                  <ColumnMenu col="value" />
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




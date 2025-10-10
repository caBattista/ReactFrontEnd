import * as React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type ProjectRow = { id: string; name: string; value: string }

export default function Projects() {
  const [leftRows, setLeftRows] = React.useState<ProjectRow[]>([
    { id: "p1", name: "Website Revamp", value: "In Progress" },
    { id: "p2", name: "Mobile App", value: "Planning" },
    { id: "p3", name: "Marketing Site", value: "Done" },
  ])
  const [sections, setSections] = React.useState<{ title: string; rows: ProjectRow[] }[]>([
    { title: "Backlog", rows: [] },
    { title: "Active", rows: [] },
    { title: "Completed", rows: [] },
  ])

  const onDragStartLeft = (row: ProjectRow) => (e: React.DragEvent<HTMLTableRowElement>) => {
    e.dataTransfer.setData("application/json", JSON.stringify(row))
    e.dataTransfer.effectAllowed = "move"
  }

  const onDropToSection = (sectionIndex: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const data = e.dataTransfer.getData("application/json")
    if (!data) return
    const dropped: ProjectRow = JSON.parse(data)

    setLeftRows((prev) => prev.filter((r) => r.id !== dropped.id))
    setSections((prev) => {
      const next = [...prev]
      const exists = next[sectionIndex].rows.some((r) => r.id === dropped.id)
      if (!exists) {
        next[sectionIndex] = {
          ...next[sectionIndex],
          rows: [...next[sectionIndex].rows, dropped],
        }
      }
      return next
    })
  }

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  return (
    <div className="h-full w-full flex flex-col min-h-0">
      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground"></div>
      <div className="grid gap-4 md:grid-cols-3 flex-1 min-h-0">
        <div className="rounded-md border md:col-span-2 min-h-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leftRows.map((row) => (
                <TableRow
                  key={row.id}
                  draggable
                  onDragStart={onDragStartLeft(row)}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>Drag rows into sections on the right.</TableCaption>
          </Table>
        </div>
        <div className="rounded-md border overflow-y-auto overflow-x-hidden md:col-span-1 min-h-0 p-3 space-y-6">
          {sections.map((section, idx) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground px-1">{section.title}</h2>
              <div
                className="rounded-md border"
                onDragOver={allowDrop}
                onDrop={onDropToSection(idx)}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {section.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}




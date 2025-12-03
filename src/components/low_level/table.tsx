import * as React from "react"
import { Button } from "@/components/low_level/button"
import { MoreVertical } from "lucide-react"

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<div className="w-full">
			<table data-slot="table" className={"w-full caption-bottom text-sm " + (className ?? "")} {...props} />
		</div>
	)
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead data-slot="table-header" className={"[&_tr]:border-b " + (className ?? "")} {...props} />
	)
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody data-slot="table-body" className={"[&_tr:last-child]:border-0 " + (className ?? "")} {...props} />
	)
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot data-slot="table-footer" className={"bg-muted/50 font-medium " + (className ?? "")} {...props} />
	)
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr data-slot="table-row" className={"border-b transition-colors hover:bg-muted/50 " + (className ?? "")} {...props} />
	)
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			// Make header cells sticky so the header remains visible when scrolling the table
			className={"sticky top-0 z-10 bg-background h-10 px-4 text-left align-middle font-medium text-muted-foreground " + (className ?? "")}
			{...props}
		/>
	)
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td data-slot="table-cell" className={"p-4 align-middle " + (className ?? "")} {...props} />
	)
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
	return (
		<caption data-slot="table-caption" className={"mt-4 text-sm text-muted-foreground " + (className ?? "")} {...props} />
	)
}

// ColumnMenu: small, reusable menu for per-column filter/sort. It supports two modes:
// - legacy text filter (when `values` prop is not provided)
// - checkbox list mode (when `values` prop is provided) for multi-select filtering

type ColumnMenuProps = {
	col: string
	openMenu: string | null
	// intentionally loose here to avoid coupling to consumer key types
	setOpenMenu: React.Dispatch<any>
	// legacy text filter
	tempFilter?: string
	setTempFilter?: React.Dispatch<React.SetStateAction<string>>
	currentFilter?: string
		applyFilter?: (col: string) => () => void
		clearFilter?: (col: string) => () => void
	// checkbox list mode
	values?: string[]
	selectedValues?: string[]
	onApplySelection?: (selected: string[]) => void
	// sort actions
		sortAsc?: any
		sortDesc?: any
}
	function ColumnMenu(props: ColumnMenuProps): React.ReactElement {
	const { col, openMenu, setOpenMenu, tempFilter, setTempFilter, currentFilter, applyFilter, clearFilter, values, selectedValues, onApplySelection, sortAsc, sortDesc } = props

	const toggleMenu = () => {
		const nextOpen = openMenu === col ? null : col
		setOpenMenu(nextOpen)
		if (nextOpen === col && setTempFilter && typeof currentFilter === 'string') setTempFilter(currentFilter)
	}

	// checkbox-mode local state
	const [search, setSearch] = React.useState("")
	const [localSelected, setLocalSelected] = React.useState<Set<string>>(new Set(selectedValues ?? []))

	React.useEffect(() => {
		setLocalSelected(new Set(selectedValues ?? []))
	}, [selectedValues])

	const toggleValue = (v: string) => {
		setLocalSelected((s) => {
			const next = new Set(s)
			if (next.has(v)) next.delete(v)
			else next.add(v)
			return next
		})
	}

	const selectAll = () => {
		if (!values) return
		setLocalSelected(new Set(values))
	}

	const clearAll = () => setLocalSelected(new Set())

	const applySelection = () => {
		onApplySelection?.(Array.from(localSelected))
	}

	const filteredValues = (values ?? []).filter((v) => v.toLowerCase().includes(search.toLowerCase()))

	return (
		<div className="relative inline-block" data-col-menu-root>
			<Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMenu}>
				<MoreVertical />
			</Button>
			{openMenu === col ? (
				<div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-md border bg-background p-2 shadow-sm">
					<div className="px-2 py-1.5 text-xs text-muted-foreground">{`Column: ${String(col)}`}</div>

					{values ? (
						<div>
							<div className="flex items-center gap-2 px-2 py-2">
								<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search values..." className="h-8 w-full rounded-md border px-2 text-xs bg-transparent" />
							</div>
							<div className="px-2 text-xs text-muted-foreground">{`${values.length} total`}</div>
							<div className="max-h-48 overflow-auto px-2 py-2">
								<label className="flex items-center gap-2 px-1 py-1">
									<input type="checkbox" checked={localSelected.size === values.length} onChange={(e) => (e.target.checked ? selectAll() : clearAll())} />
									<span className="text-sm">Select all</span>
								</label>
								{filteredValues.map((v) => (
									<label key={v} className="flex items-center gap-2 px-1 py-1">
										<input type="checkbox" checked={localSelected.has(v)} onChange={() => toggleValue(v)} />
										<span className="text-sm break-words">{v}</span>
									</label>
								))}
							</div>
							<div className="flex items-center gap-2 px-2 pb-2">
								<Button size="sm" variant="outline" onClick={applySelection}>Apply</Button>
								<Button size="sm" variant="ghost" onClick={() => { clearAll(); applySelection(); }}>Clear</Button>
							</div>
						</div>
					) : (
						<>
							<div className="flex items-center gap-2 px-2 py-2">
								<input value={tempFilter ?? ''} onChange={(e) => setTempFilter?.(e.target.value)} placeholder="Filter contains..." className="h-8 w-full rounded-md border px-2 text-xs bg-transparent" />
							</div>
							<div className="flex items-center gap-2 px-2 pb-2">
								<Button size="sm" variant="outline" onClick={applyFilter?.(col)}>Apply</Button>
								<Button size="sm" variant="ghost" onClick={clearFilter?.(col)}>Clear</Button>
							</div>
						</>
					)}

					<div className="h-px bg-border mx-2 my-1" />
					<div className="flex items-center gap-2 px-2 pb-1">
						<Button size="sm" variant="ghost" onClick={sortAsc?.(col)}>Sort asc</Button>
						<Button size="sm" variant="ghost" onClick={sortDesc?.(col)}>Sort desc</Button>
					</div>
				</div>
			) : null}
		</div>
	)
}

export { ColumnMenu }

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
}

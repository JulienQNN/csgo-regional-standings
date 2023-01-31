import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    createSolidTable,
} from '@tanstack/solid-table'
import { createSignal, For, Show } from 'solid-js'
import { columns, Team, europeData } from "./components/Data/DataStandings"
import { Nav } from "./components/Nav"

function App() {
    const [data, setData] = createSignal<Team[]>(europeData.slice(1))
    const [title, setTitle] = createSignal<string>("EUROPE")
    const [subtitle, setSubTitle] = createSignal<string>(europeData[0].title)
    const [sorting, setSorting] = createSignal<SortingState>([])

    const table = createSolidTable({
        get data() {
            return data()
        },
        columns,
        initialState: {
            columnVisibility: {
                'pointsdiff': false,
                'ranksdiff': false
            }
        },
        state: {
            get sorting() {
                return sorting()
            },
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })
    return (
        <div class={`bg-gradient-to-r ${title() === 'EUROPE' ? "from-teal-500 via-blue-500 to-teal-500" : title() === 'AMERICAS' ? "from-lime-500 via-yellow-500 to-lime-500" : "from-red-500 via-amber-500 to-red-500"} pt-24 min-w-fix`}>
            <Nav refreshData={setData} refreshTitle={setTitle} refreshSubtitle={setSubTitle} />
            <div class="overflow-x-auto w-full drop-shadow-2xl">
                <h1 class="my-5 mx-2 sm:mx-auto max-w-4xl text-4xl w-full whitespace-nowrap font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{title}</span></h1>
                <h3 class="my-5 mx-2 sm:mx-auto max-w-4xl text-sm w-full whitespace-nowrap text-lg font-normal text-black lg:text-xl dark:text-gray-400">{subtitle}</h3>
                <table class='mx-auto sm:my-5 max-w-4xl w-full whitespace-nowrap sm:rounded-lg bg-white divide-y divide-white/40 overflow-hidden bg-white/60 backdrop-blur-sm'>
                    <thead class="bg-gray-800">
                        <For each={table.getHeaderGroups()}>
                            {headerGroup => (
                                <tr class="text-white text-left">
                                    <For each={headerGroup.headers}>
                                        {header => (
                                            <th class='font-semibold text-sm uppercase px-3 py-4' colSpan={header.colSpan}>
                                                <Show when={!header.isPlaceholder}>
                                                    <div
                                                        class={
                                                            header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : undefined
                                                        }
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: '  ⮝',
                                                            desc: '  ⮟',
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </div>
                                                </Show>
                                            </th>
                                        )}
                                    </For>
                                </tr>
                            )}
                        </For>
                    </thead>
                    <tbody class='divide-y divide-white/40'>
                        <For each={table.getRowModel().rows}>
                            {row => (
                                <tr class={`${parseInt(row.id) > 29 && title() === "EUROPE" ? 'bg-black/20' : ''
                                    }`}>
                                    <For each={row.getVisibleCells()}>
                                        {cell => (
                                            <td class='px-3 py-2 border-r border-white/40'>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )}
                                    </For>
                                </tr>
                            )}
                        </For>
                    </tbody>
                    <tfoot class='bg-gray-800'>
                        <For each={table.getFooterGroups()}>
                            {footerGroup => (
                                <tr class="text-white text-left">
                                    <For each={footerGroup.headers}>
                                        {header => (
                                            <th class='font-semibold text-sm uppercase px-6 py-4' colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.footer,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        )}
                                    </For>
                                </tr>
                            )}
                        </For>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default App


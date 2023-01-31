import { ColumnDef, } from '@tanstack/solid-table';
import { FiArrowDownRight, FiArrowUpRight } from 'solid-icons/fi';

import standings_americas from '../Data/standings_americas.json';
import standings_asia from '../Data/standings_asia.json';
import standings_europe from '../Data/standings_europe.json';

export type Team = {
    title: string;
    standing: string;
    points: string;
    team: string;
    roster: String[];
    ranksdiff: number;
    pointsdiff: number;
};

export const americasData: Team[] = standings_americas;
export const asiaData: Team[] = standings_asia;
export const europeData: Team[] = standings_europe;

export const columns: ColumnDef<Team>[] = [
    {
        accessorKey: 'standing',
        id: 'standing',
        cell: (props) => {
            if (props.row.original.ranksdiff < 0) {
                return (
                    <p class='inline-flex items-center justify-center space-x-4'>
                        <span>{props.row.original.standing}</span>
                        <span class='inline-flex items-center justify-center space-x-2'>
                            <span class='text-rose-700'>
                                <FiArrowDownRight />
                            </span>
                            <span class='text-rose-700'>{props.row.original.ranksdiff}</span>
                        </span>
                    </p>
                );
            } else if (props.row.original.ranksdiff === 0) {
                return (
                    <p class='inline-flex items-center justify-center space-x-4'>
                        <span>{props.row.original.standing}</span>
                        <span class='inline-flex items-center justify-center'>
                            <span>
                            </span>
                        </span>
                    </p>
                );
            } else {
                return (
                    <p class='inline-flex items-center justify-center space-x-4'>
                        <span>{props.row.original.standing}</span>
                        <span class='inline-flex items-center justify-center space-x-2'>
                            <span class='text-emerald-700'>
                                <FiArrowUpRight />
                            </span>
                            <span class='text-emerald-600'>
                                {props.row.original.ranksdiff}
                            </span>
                        </span>
                    </p>
                );
            }
        },
        header: () => <span>Rank</span>,
        footer: () => <span>Rank</span>,
    },
    {
        accessorKey: 'ranksdiff',
        id: 'ranksdiff',
        cell: () => <></>,
        header: () => <span></span>,
        footer: () => <span></span>,
    },
    {
        accessorKey: 'points',
        id: 'points',
        cell: (props) => {
            if (props.row.original.pointsdiff < 0) {
                return (
                    <p class='inline-flex items-center justify-center'>
                        <span>{props.row.original.points}</span>
                        <span class='pl-4 text-rose-700'>
                            <FiArrowDownRight />
                        </span>
                        <span class='pl-1 text-rose-700'>
                            {props.row.original.pointsdiff}
                        </span>
                    </p>
                );
            } else if (props.row.original.pointsdiff === 0) {
                return (
                    <p class='inline-flex items-center justify-center'>
                        <span>{props.row.original.points}</span>
                        <span>
                        </span>
                    </p>
                );
            } else {
                return (
                    <p class='inline-flex items-center justify-center'>
                        <span>{props.row.original.points}</span>
                        <span class='pl-4 text-emerald-700'>
                            <FiArrowUpRight />
                        </span>
                        <span class='pl-1  text-emerald-600'>
                            {props.row.original.pointsdiff}
                        </span>
                    </p>
                );
            }
        },
        header: () => <span>Points</span>,
        footer: () => <span>Points</span>,
    },
    {
        accessorKey: 'pointsdiff',
        id: 'pointsdiff',
        cell: () => <></>,
        header: () => <></>,
        footer: () => <></>,
    },
    {
        accessorKey: 'team',
        id: 'team',
        cell: (info) => info.getValue(),
        header: () => <span>Team Name</span>,
        footer: (props) => props.column.id,
    },
    {
        accessorKey: 'roster',
        id: 'roster',
        cell: (info) => {
            return (
                <div class='inline-flex space-x'>
                    <p class='px-2'>{info.row.original.roster[0]}</p>
                    <p class='px-2'>{info.row.original.roster[1]}</p>
                    <p class='px-2'>{info.row.original.roster[2]}</p>
                    <p class='px-2'>{info.row.original.roster[3]}</p>
                    <p class='px-2'>{info.row.original.roster[4]}</p>
                </div>
            );
        },
        header: () => <span>Roster</span>,
        footer: (props) => props.column.id,
    },
];

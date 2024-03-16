// 'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Badge
} from '@tremor/react';
import { useAppSelector } from '../hooks/store';
import useUserAction from '../hooks/useUserAction';
import {CreateNewUser} from './CreateNewUser';

export default function ListOfUsers() {
  const data = useAppSelector((state) => state.users)
  const { handleDelete } = useUserAction()

  return (
    <div className="flex justify-between max-w-5xl mx-auto">

      <div className="flex items-center justify-center mr-6">
        <CreateNewUser/>
      </div>

      <Table className="border border-gray-100 mt-11 p-11 rounded-xl shadow-lg mx-auto">
         <TableHead className="border-b border-gray-400">
          <TableRow className="dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Id
            </TableHeaderCell>
            <TableHeaderCell>
              Image
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Nombre
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong max-sm:hidden">
              Email
            </TableHeaderCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-b border-gray-100 mx-11">
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.id.length > 7 ? `${item.id.slice(0, 7)} ...`: item.id}
              </TableCell>
              <TableCell className="flex justify-center">
                <img src={`https://unavatar.io/${item.github}`} className="w-[50px] rounded-full mr-6" />
              </TableCell>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell className="max-sm:hidden">{item.email}</TableCell>
              <TableCell>
                <button type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button type="button" className="text-red-500" onClick={
                  () => handleDelete(item.id)
                  }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </button>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}

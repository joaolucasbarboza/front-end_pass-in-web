import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  Search,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface AttendeeType {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<AttendeeType[]>([]);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "https://api-nodejs-pass-in-8ni9kpib1-valladevs-projects.vercel.app/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }
  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  return (
    <div className="flex flex-col mb-6 gap-6 px-6">
      <div className="flex flex-col  gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Participantes
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={onSearchInputChanged}
            type="search"
            placeholder="Buscar participantes..."
            className="pl-8 sm:w-[300px]  lg:w-[300px] focus:ring-0 focus-visible:ring-0 focus:border"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="h-14">
              <TableHead className="pl-6 min-w-14">
                <Checkbox className="w-5 h-5  transition-all" />
              </TableHead>
              <TableHead className="w-[100px] min-w-[40px]">Codigo</TableHead>
              <TableHead>Participante</TableHead>
              <TableHead className="min-w-[140px]">Data de inscrição</TableHead>
              <TableHead className="min-w-[140px]">Data do check-in</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendees.map((attendee) => {
              return (
                <TableRow
                  key={attendee.id}
                  className="h-16"
                >
                  <TableCell className="pl-6">
                    <Checkbox className="w-5 h-5 transition-all" />
                  </TableCell>
                  <TableCell className="font-medium">{attendee.id}</TableCell>
                  <TableCell className="max-w-[320px]">
                    <div>
                      <p className="truncate">{attendee.name}</p>
                      <span className="text-muted-foreground">
                        {attendee.email.toLocaleLowerCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>
                    {attendee.checkedInAt == null ? (
                      <span className="text-muted-foreground">
                        Não fez check-in
                      </span>
                    ) : (
                      dayjs().to(attendee.checkedInAt)
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={"outline"}
                      size="icon"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={5}></TableCell>
              <TableCell className="text-right justify-end flex"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-end sm:items-center sm:justify-between gap-4">
        <span>
          Mostrando {attendees.length} de {total} itens
        </span>

        <div className="flex  items-center gap-8">
          <span className="truncate">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-1.5">
            <Button
              variant={"secondary"}
              size="icon"
              onClick={goToFirstPage}
              disabled={page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"secondary"}
              size="icon"
              onClick={goToPreviousPage}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"secondary"}
              size="icon"
              onClick={goToNextPage}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant={"secondary"}
              size="icon"
              onClick={goToLastPage}
              disabled={page === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

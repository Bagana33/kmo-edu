"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { initializeStorage, getLeads, updateLeadStatus, deleteLead } from "@/lib/storage"
import type { Lead } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

const statusLabels: Record<Lead["status"], string> = {
  new: "Шинэ",
  contacted: "Холбогдсон",
  qualified: "Чанарласан",
  closed: "Хаасан",
}

const statusColors: Record<Lead["status"], "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  qualified: "outline",
  closed: "destructive",
}

const serviceLabels: Record<Lead["service_type"], string> = {
  consulting: "Зөвлөгөө",
  study_abroad: "Гадаадад суралцах",
  korean_course: "Хэлний сургалт",
  other: "Бусад",
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<string>("all")

  const loadLeads = () => {
    initializeStorage()
    setLeads(getLeads())
  }

  useEffect(() => {
    loadLeads()
  }, [])

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    updateLeadStatus(id, status)
    loadLeads()
    toast.success("Статус шинэчлэгдлээ")
  }

  const handleDelete = (id: string) => {
    if (confirm("Энэ lead-ийг устгах уу?")) {
      deleteLead(id)
      loadLeads()
      toast.success("Lead устгагдлаа")
    }
  }

  const filteredLeads = filter === "all" ? leads : leads.filter((l) => l.status === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground">Вэбсайтаас ирсэн хүсэлтүүд</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Бүх Leads ({filteredLeads.length})</CardTitle>
              <CardDescription>Хүсэлтүүдийг удирдах</CardDescription>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Шүүх" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүгд</SelectItem>
                <SelectItem value="new">Шинэ</SelectItem>
                <SelectItem value="contacted">Холбогдсон</SelectItem>
                <SelectItem value="qualified">Чанарласан</SelectItem>
                <SelectItem value="closed">Хаасан</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Нэр</TableHead>
                    <TableHead>Утас</TableHead>
                    <TableHead>Үйлчилгээ</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Огноо</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.full_name}</div>
                          {lead.email && <div className="text-sm text-muted-foreground">{lead.email}</div>}
                        </div>
                      </TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{serviceLabels[lead.service_type]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead.id, value as Lead["status"])}
                        >
                          <SelectTrigger className="w-[140px]">
                            <Badge variant={statusColors[lead.status]}>{statusLabels[lead.status]}</Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString("mn-MN")}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">Lead байхгүй байна</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

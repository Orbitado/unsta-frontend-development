import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useExpenses } from "./modules/expenses/hooks/use-expenses"
import { CreateExpense } from "./modules/expenses/types"
import { categories } from "./constants/categories"
import { formatCurrency, formatDate } from "./lib/utils"

function App() {
  const { expenses, loading, error, addExpense, editExpense, deleteExpense } = useExpenses()

  const [formData, setFormData] = useState<CreateExpense>({
    date: new Date(),
    category: "",
    description: "",
    amount: 0
  })

  const [editingId, setEditingId] = useState<string | null>(null)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.category || !formData.description || formData.amount <= 0) {
      alert("Por favor completa todos los campos correctamente")
      return
    }

    try {
      if (editingId) {
        await editExpense(editingId, formData)
        setEditingId(null)
      } else {
        await addExpense(formData)
      }

      resetForm()
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      date: new Date(),
      category: "",
      description: "",
      amount: 0
    })
    setEditingId(null)
  }

  const handleEdit = (expense: { id: string; date: Date; category: string; description: string; amount: number }) => {
    setFormData({
      date: new Date(expense.date),
      category: expense.category,
      description: expense.description,
      amount: expense.amount
    })
    setEditingId(expense.id)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este gasto?")) {
      try {
        await deleteExpense(id)
      } catch (error) {
        console.error("Error deleting expense:", error)
      }
    }
  }

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <div className="space-y-6 mx-auto max-w-3xl">
        {/* Main Title */}
        <h1 className="mb-8 font-bold text-blue-600 text-3xl text-center">
          Mis Gastos Mensuales
        </h1>

        {/* Add/Edit Expense Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-xl">
              {editingId ? "Editar Gasto" : "Cargar Nuevo Gasto"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Row: Category and Date */}
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {/* Category Select */}
                <div className="space-y-2">
                  <label className="font-medium text-sm">Categoría</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="font-medium text-sm">Fecha</label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start w-full font-normal text-left"
                      >
                        <CalendarIcon className="mr-2 w-4 h-4" />
                        {formData.date ? format(formData.date, "dd 'de' MMMM 'de' yyyy", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => {
                          if (date) {
                            setFormData(prev => ({ ...prev, date: date }))
                            setCalendarOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Second Row: Description - Full Width */}
              <div className="space-y-2">
                <label className="font-medium text-sm">Detalle</label>
                <Input
                  className="w-full"
                  placeholder="Descripción del gasto"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Third Row: Amount - Full Width */}
              <div className="space-y-2">
                <label className="font-medium text-sm">Monto $</label>
                <Input
                  className="w-full"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.amount === 0 ? "" : formData.amount.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setFormData(prev => ({ ...prev, amount: 0 }));
                    } else {
                      const numValue = parseFloat(value);
                      if (!isNaN(numValue)) {
                        setFormData(prev => ({ ...prev, amount: numValue }));
                      }
                    }
                  }}
                />
              </div>

              {/* Submit Button - Full Width */}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : (editingId ? "Aceptar" : "Agregar")}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 px-4 py-3 border border-red-400 rounded text-red-700">
            {error}
          </div>
        )}

        {/* Expenses History Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-xl">Historial de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && expenses.length === 0 ? (
              <div className="py-8 text-center">Cargando gastos...</div>
            ) : expenses.length === 0 ? (
              <div className="py-8 text-gray-500 text-center">No hay gastos registrados</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center bg-blue-100 px-2.5 py-0.5 rounded-full font-medium text-blue-800 text-xs">
                            {expense.category}
                          </span>
                        </TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(expense.amount)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(expense)}
                              disabled={loading}
                            >
                              <Edit className="mr-1 w-4 h-4" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(expense.id)}
                              disabled={loading}
                            >
                              <Trash2 className="mr-1 w-4 h-4" />
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
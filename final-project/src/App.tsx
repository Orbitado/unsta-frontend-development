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
import { Label } from "./components/ui/label"

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
    <div className="bg-gray-50 px-6 py-8 min-h-screen">
      <div className="space-y-8 mx-auto max-w-5xl">
        {/* Main Title */}
        <h1 className="mb-12 font-bold text-blue-600 text-4xl text-center tracking-tight">
          Mis Gastos Mensuales
        </h1>

        {/* Add/Edit Expense Form */}
        <Card className="shadow-md border-0">
          <CardHeader className="pb-6">
            <CardTitle className="font-semibold text-blue-600 text-2xl">
              {editingId ? "Editar Gasto" : "Cargar Nuevo Gasto"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* First Row: Category and Date */}
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {/* Category Select */}
                <div className="space-y-3">
                  <Label className="font-medium text-gray-800 text-sm">Categoría</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
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
                <div className="space-y-3">
                  <Label className="font-medium text-gray-800 text-sm">Fecha</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start px-4 w-full h-12 font-normal text-left"
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
              <div className="space-y-3">
                <Label className="font-medium text-gray-800 text-sm">Detalle</Label>
                <Input
                  className="px-4 w-full h-12"
                  placeholder="Descripción del gasto"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Third Row: Amount - Full Width */}
              <div className="space-y-3">
                <Label className="font-medium text-gray-800 text-sm">Monto $</Label>
                <Input
                  className="px-4 w-full h-12"
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
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 font-medium text-base"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : (editingId ? "Aceptar" : "Agregar")}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 h-12 font-medium"
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
          <div className="bg-red-100 px-6 py-4 border border-red-400 rounded-lg font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Expenses History Table */}
        <Card className="shadow-md border-0">
          <CardHeader className="pb-6">
            <CardTitle className="font-semibold text-blue-600 text-2xl">Historial de Gastos</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {loading && expenses.length === 0 ? (
              <div className="py-12 font-medium text-gray-600 text-center">Cargando gastos...</div>
            ) : expenses.length === 0 ? (
              <div className="py-12 font-medium text-gray-500 text-center">No hay gastos registrados</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2">
                      <TableHead className="py-4 font-semibold text-gray-800">Fecha</TableHead>
                      <TableHead className="py-4 font-semibold text-gray-800">Categoría</TableHead>
                      <TableHead className="py-4 font-semibold text-gray-800">Descripción</TableHead>
                      <TableHead className="py-4 font-semibold text-gray-800">Monto</TableHead>
                      <TableHead className="py-4 font-semibold text-gray-800">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id} className="hover:bg-gray-50">
                        <TableCell className="py-5 font-medium text-gray-700">{formatDate(expense.date)}</TableCell>
                        <TableCell className="py-5">
                          <span className="inline-flex items-center bg-blue-100 px-3 py-1 rounded-full font-medium text-blue-800 text-sm">
                            {expense.category}
                          </span>
                        </TableCell>
                        <TableCell className="py-5 max-w-xs text-gray-700 truncate">{expense.description}</TableCell>
                        <TableCell className="py-5 font-bold text-gray-900">{formatCurrency(expense.amount)}</TableCell>
                        <TableCell className="py-5">
                          <div className="flex space-x-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="px-4 h-9 font-medium"
                              onClick={() => handleEdit(expense)}
                              disabled={loading}
                            >
                              <Edit className="mr-2 w-4 h-4" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 px-4 h-9 font-medium text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(expense.id)}
                              disabled={loading}
                            >
                              <Trash2 className="mr-2 w-4 h-4" />
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
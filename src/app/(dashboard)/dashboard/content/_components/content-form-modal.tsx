"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import QuillEditor from "./QuillEditor"
import Image from "next/image"

interface Content {
  id?: number
  category_id: number
  subcategory_id: number
  heading: string
  author: string
  date: string
  sub_heading: string
  body1: string
  image1: string | File
  advertising_image: string | File
  tags: string[] | null
  created_at?: string
  updated_at?: string
}

interface ContentFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: FormData) => Promise<void>
  initialContent?: Content | null
  categoryId: string | string[]
  subcategoryId: string | string[]
  isEditing?: boolean
}

export default function ContentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialContent,
  categoryId,
  subcategoryId,
  isEditing = false,
}: ContentFormModalProps) {
  const [content, setContent] = useState<Content>({
    category_id: Number(categoryId),
    subcategory_id: Number(subcategoryId),
    heading: "",
    author: "",
    date: format(new Date(), "yyyy-MM-dd"),
    sub_heading: "",
    body1: "",
    image1: "",
    advertising_image: "",
    tags: [],
  })
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image1Preview, setImage1Preview] = useState<string | null>(null)
  const [adImagePreview, setAdImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (initialContent) {
      setContent({
        ...initialContent,
        category_id: Number(categoryId),
        subcategory_id: Number(subcategoryId),
      })

      if (initialContent.date) {
        setDate(new Date(initialContent.date))
      }

      // Set image previews if available
      if (typeof initialContent.image1 === "string" && initialContent.image1.startsWith("images/")) {
        setImage1Preview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${initialContent.image1}`)
      }

      if (
        typeof initialContent.advertising_image === "string" &&
        initialContent.advertising_image.startsWith("images/")
      ) {
        setAdImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${initialContent.advertising_image}`)
      }
    } else {
      resetForm()
    }
  }, [initialContent, categoryId, subcategoryId])

  const resetForm = () => {
    setContent({
      category_id: Number(categoryId),
      subcategory_id: Number(subcategoryId),
      heading: "",
      author: "",
      date: format(new Date(), "yyyy-MM-dd"),
      sub_heading: "",
      body1: "",
      image1: "",
      advertising_image: "",
      tags: [],
    })
    setDate(new Date())
    setTagInput("")
    setImage1Preview(null)
    setAdImagePreview(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuillChange = (field: string, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      setContent((prev) => ({ ...prev, date: format(selectedDate, "yyyy-MM-dd") }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: "image1" | "advertising_image") => {
    const file = e.target.files?.[0]
    if (file) {
      setContent((prev) => ({ ...prev, [imageType]: file }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        if (imageType === "image1") {
          setImage1Preview(reader.result as string)
        } else {
          setAdImagePreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && content.tags) {
      if (!content.tags.includes(tagInput.trim())) {
        setContent((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()],
        }))
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setContent((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      // Add content ID if editing
      if (isEditing && content.id) {
        formData.append("id", content.id.toString())
      }

      formData.append("category_id", content.category_id.toString())
      formData.append("subcategory_id", content.subcategory_id.toString())
      formData.append("heading", content.heading)
      formData.append("author", content.author)
      formData.append("date", content.date)
      formData.append("sub_heading", content.sub_heading)
      formData.append("body1", content.body1)

      // Handle image uploads
      if (content.image1 instanceof File) {
        formData.append("image1", content.image1)
      }

      if (content.advertising_image instanceof File) {
        formData.append("advertising_image", content.advertising_image)
      }

      // Handle tags
      if (content.tags && content.tags.length > 0) {
        content.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag)
        })
      }

      await onSubmit(formData)
      resetForm()
      onClose()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Blog Content" : "Add New Blog Content"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heading */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                name="heading"
                value={content.heading}
                onChange={handleInputChange}
                placeholder="Enter blog heading"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={content.author}
                onChange={handleInputChange}
                placeholder="Enter author name(s)"
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Sub Heading */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sub_heading">Sub Heading</Label>
              <QuillEditor
                id="sub_heading"
                value={content.sub_heading}
                onChange={(value) => handleQuillChange("sub_heading", value)}
              />
            </div>

            {/* Body Content */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="body1">Content</Label>
              <QuillEditor
                id="body1"
                value={content.body1}
                onChange={(value) => handleQuillChange("body1", value)}
              />
            </div>

            {/* Main Image */}
            <div className="space-y-2">
              <Label htmlFor="image1">Main Image</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="image1"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "image1")}
                  className="cursor-pointer"
                />
                {image1Preview && (
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={image1Preview || "/placeholder.svg"}
                      alt="Main image preview"
                      className="w-full h-full object-contain"
                      width={400}
                      height={300}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Advertising Image */}
            <div className="space-y-2">
              <Label htmlFor="advertising_image">Advertising Image</Label>
              <div className="flex flex-col gap-2">
                <Input
                  id="advertising_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "advertising_image")}
                  className="cursor-pointer"
                />
                {adImagePreview && (
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={adImagePreview || "/placeholder.svg"}
                      alt="Advertising image preview"
                      className="w-full h-full object-contain"
                      width={400}
                      height={300}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tagInput"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tags"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button type="button" onClick={addTag} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {content.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1 text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600 text-white">
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client";

import { useForm, Controller } from "react-hook-form";
import { POST } from "../app/api/route";
import Product from "./typeForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface IProductForm extends Omit<Product, 'seo'> {
  seo: {
    seo_title: string;
    seo_description: string;
    seo_keywords: string; 
  }
}

interface IFormProps {
  onAdd: (product: Product) => void;
  onCancel: () => void;
}

function Form({ onAdd, onCancel }: IFormProps) {
  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm<IProductForm>({
    defaultValues: {
      type: "product",
      cashback_type: "no_cashback",
      chatting_percent: 0,
    }
  });

  const onSubmit = async (data: IProductForm) => {
    const product: Product = {
      ...data,
      unit: Number(data.unit),
      category: Number(data.category),
      global_category_id: Number(data.global_category_id),
      marketplace_price: Number(data.marketplace_price),
      chatting_percent: Number(data.chatting_percent),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      seo: {
        ...data.seo,
        seo_keywords: data.seo.seo_keywords.split(",").map((k) => k.trim()),
      },
    };

    try {
      const result = await POST(
        `https://app.tablecrm.com/api/v1/nomenclature/?token=${apiKey}`,
        product
      );
      onAdd(result);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-10">
        <div className="flex flex-col gap-3">
          <Input {...register("name")} placeholder="Название" />

    
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Выбери тип" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="product">product</SelectItem>
                  <SelectItem value="offer">offer</SelectItem>
                  <SelectItem value="service">service</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Input {...register("description_short")} placeholder="Краткое описание" />
          <Input {...register("description_long")} placeholder="Длинное описание" />
          <Input {...register("code")} placeholder="Код товара" />
          <Input type="number" {...register("unit")} placeholder="Единица" />
          <Input type="number" {...register("category")} placeholder="Категория" />

          <Controller
            name="cashback_type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Выбери кэшбек" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="lcard_cashback">lcard_cashback</SelectItem>
                  <SelectItem value="percent">percent</SelectItem>
                  <SelectItem value="const">const</SelectItem>
                  <SelectItem value="no_cashback">no_cashback</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Input {...register("seo.seo_title")} placeholder="SEO название" />
          <Input {...register("seo.seo_description")} placeholder="SEO описание" />
          <Input {...register("seo.seo_keywords")} placeholder="SEO ключи через запятую" />
        </div>

        <div className="flex flex-col gap-3">
          <Input type="number" {...register("global_category_id")} placeholder="Глобальная категория" />
          <Input type="number" {...register("marketplace_price")} placeholder="0.00" />
          <Input type="number" {...register("chatting_percent")} placeholder="Процент чата" />
          <Input {...register("address")} placeholder="Адрес" />
          <Input type="number" {...register("latitude")} placeholder="Широта" />
          <Input type="number" {...register("longitude")} placeholder="Долгота" />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Отмена
        </Button>

        <Button
          className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </div>
    </form>
  );
}

export default Form;
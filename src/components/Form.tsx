"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
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



interface IProductForm extends Omit<Product, "seo"> {
  seo: {
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
  };
}

interface IFormProps {
  product?: Product;
  onAdd: (product: Product) => void;
  onCancel: () => void;
}

function Form({ onAdd, onCancel }: IFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<IProductForm>({});
  const [activeTab, setActiveTab] = useState<"main" | "seo" | "fast">("main");

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
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
       const result = await response.json();
      onAdd(result);
      reset();
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <button
        type="button"
        onClick={() => setActiveTab("main")}
        className={`px-4 py-2 ${activeTab === "main" ? "border-b-2 border-blue-500 font-bold" : ""}`}
      >
        Основное
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("seo")}
        className={`px-4 py-2 ${activeTab === "seo" ? "border-b-2 border-blue-500 font-bold" : ""}`}
      >
        SEO
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("fast")}
        className={`px-4 py-2 ${activeTab === "fast" ? "border-b-2 border-blue-500 font-bold" : ""}`}
      >
        Быстро
      </button>

      <div className="flex gap-10">
        {activeTab === "main" && (
          <div className="flex flex-col gap-3 w-150 text-sm">
            <label >
              Имя
              <Input {...register("name")} className="" />
            </label>
            <label>
              Тип
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue="">
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Выбери тип" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="product">Товар</SelectItem>
                      <SelectItem value="offer">Услуга</SelectItem>
                      <SelectItem value="service">Предложение</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </label>
            <label>
              Краткое описание
              <Input {...register("description_short")} />
            </label>
            <label>
              Длинное описание
              <Input {...register("description_long")} />
            </label>
            <label>
              Код товара
              <Input {...register("code")} />
            </label>
            <label>
              Единица
              <Input type="number" {...register("unit")} />
            </label>
            <label>
              Категория
              <Input type="number" {...register("category")} />
            </label>
            <label>
              Тип кэшбека
              <Controller
                name="cashback_type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue="">
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="percent">Проценты</SelectItem>
                      <SelectItem value="const">Постоянный</SelectItem>
                      <SelectItem value="lcard_cashback">По карте лояльности</SelectItem>
                      <SelectItem value="no_cashback">Отсутствует</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </label>
          </div>
        )}

        {activeTab === "seo" && (
          <>
            <div className="flex flex-col gap-3 w-150">
              <label>
                Seo Title
                <Input
                  {...register("seo.seo_title")}
                  placeholder="Заголовок для поисковиков"
                />
              </label>
              <label>
                Seo Description
                <Input
                  {...register("seo.seo_description")}
                  placeholder="Краткое описание для поисковиков"
                />
              </label>
              <label>
                Seo Keywords
                <Input
                  {...register("seo.seo_keywords")}
                  placeholder="Ключевые слова"
                />
              </label>
            </div>
          </>
        )}

        {activeTab === "fast" && (
          <div className="flex flex-col gap-3 w-150">
            <label>
              Глобальная категория
              <Input
                type="number"
                {...register("global_category_id")}
                placeholder="Выберите глобабальную категорию"
              />
            </label>
            <label>
              Цена для маркетплейса
              <Input
                type="number"
                {...register("marketplace_price")}
                placeholder="0.00"
              />
            </label>
            <label>
              Комиссия маркета
              <Input
                type="number"
                {...register("chatting_percent")}
                placeholder="4-100"
              />
            </label>
            <label>
              Адрес
              <Input {...register("address")} placeholder="Введите адрес" />
            </label>
            <label>
              Широта
              <Input
                disabled
                type="number"
                {...register("latitude")}
                placeholder="Широта"
              />
            </label>
            <label>
              Долгота
              <Input
                type="number"
                disabled
                {...register("longitude")}
                placeholder="Долгота"
              />
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
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

import { useEffect, useMemo, useRef, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { cloudinary } from "@/shared/cloudinary";
import useAddProductForm from "../model/use-add-product-form";
import ImagePreview from "./image-preview";
import { productsConfig } from "../model/products.config";

type UploadWidget = {
  open: () => void;
  close: () => void;
  destroy: () => void;
};

const AddProductForm = () => {
  const uploadWidgetRef = useRef<UploadWidget | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
    isLoading,
    submit,
  } = useAddProductForm();
  const { uwConfig } = useMemo(() => cloudinary(), []);
  const imageId = watch("image");

  useEffect(() => {
    const cloudinaryClient = window.cloudinary;
    if (!cloudinaryClient) return;

    uploadWidgetRef.current = cloudinaryClient.createUploadWidget(
      uwConfig,
      (error, result) => {
        const publicId = result?.info?.public_id;
        if (!error && result?.event === "success" && publicId) {
          setValue("image", publicId, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      },
    );

    return () => {
      uploadWidgetRef.current?.destroy();
      uploadWidgetRef.current = null;
    };
  }, [setValue, uwConfig]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    if (submitter !== submitButtonRef.current) {
      event.preventDefault();
      return;
    }

    void handleSubmit(submit)(event);
  };

  const clearImage = () => {
    setValue("image", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <Form noValidate onSubmit={handleFormSubmit}>
      <Form.Group className="my-2">
        <Form.Label htmlFor="product-name">Name</Form.Label>
        <Form.Control
          id="product-name"
          placeholder="Enter product name"
          isInvalid={Boolean(errors.name)}
          {...register("name")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>

        <Form.Label htmlFor="upload_widget" className="mt-3">
          Image
        </Form.Label>
        <input type="hidden" {...register("image")} />
        <div className="d-flex align-items-center gap-2">
          <Button
            id="upload_widget"
            variant="primary"
            type="button"
            onClick={() => uploadWidgetRef.current?.open()}
          >
            Upload
          </Button>
          {imageId && (
            <Button variant="outline-danger" type="button" onClick={clearImage}>
              Remove image
            </Button>
          )}
        </div>
        {errors.image?.message && (
          <div className="invalid-feedback d-block" role="alert">
            {errors.image.message}
          </div>
        )}
        {imageId && <ImagePreview publicId={imageId} />}

        <Form.Label htmlFor="product-description" className="mt-3">
          Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          id="product-description"
          placeholder="Describe product"
          isInvalid={Boolean(errors.description)}
          {...register("description")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>

        <Form.Label htmlFor="product-brand" className="mt-3">
          Brand
        </Form.Label>
        <Form.Control
          id="product-brand"
          placeholder="Enter brand"
          isInvalid={Boolean(errors.brand)}
          {...register("brand")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.brand?.message}
        </Form.Control.Feedback>

        <Form.Label htmlFor="product-category" className="mt-3">
          Category
        </Form.Label>
        <Form.Select
          id="product-category"
          isInvalid={Boolean(errors.category)}
          {...register("category")}
        >
          <option value="">Choose a category</option>
          {productsConfig.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.category?.message}
        </Form.Control.Feedback>

        <Form.Label htmlFor="product-price" className="mt-3">
          Price
        </Form.Label>
        <Form.Control
          type="number"
          id="product-price"
          isInvalid={Boolean(errors.price)}
          {...register("price")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.price?.message}
        </Form.Control.Feedback>

        <Form.Label htmlFor="product-stock" className="mt-3">
          Count in stock
        </Form.Label>
        <Form.Control
          type="number"
          id="product-stock"
          isInvalid={Boolean(errors.countInStock)}
          {...register("countInStock")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.countInStock?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        ref={submitButtonRef}
        id="create-product-submit"
        type="submit"
        variant="primary"
        className="my-2"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting ? "Saving..." : "Create product"}
      </Button>
    </Form>
  );
};

export default AddProductForm;

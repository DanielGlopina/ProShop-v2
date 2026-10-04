export {};

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget(
        config: {
          cloudName: string;
          uploadPreset: string;
        },
        callback: (
          error: unknown,
          result?: {
            event?: string;
            info?: {
              public_id?: string;
            };
          },
        ) => void,
      ): {
        open: () => void;
        close: () => void;
        destroy: () => void;
      };
    };
  }
}

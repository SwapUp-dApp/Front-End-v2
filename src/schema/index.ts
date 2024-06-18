import { z } from "zod";
import moment from "moment";

export const SUFS_OpenSwapParameters = z.object({
  expirationDate: z
    .date({
      required_error: "Expiration date is required!",
    })
    .refine(
      (date) =>
        !date || moment(date).isSameOrAfter(moment(), "day"),
      {
        message: "Expiration date cannot be in the past.",
      }
    ),
  preferredAsset: z.enum(["any", "nft", "currency"], {
    required_error: "Please select a preferred asset.",
  }),
  collection: z.string().optional(),
  rarityRank: z.string().optional(),
  amountWantToReceive: z.string().optional(),
  currencies: z
    .array(
      z.object({
        uuid: z.string(),
        name: z.string(),
        iconUrl: z.string(),
      })
    )
    .optional(),
}).superRefine((data, ctx) => {
  if (data.preferredAsset === "nft") {
    if (!data.collection) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["collection"],
        message: "Please select a preferred collection.",
      });
    }

    if (!data.rarityRank) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rarityRank"],
        message: "Please select a preferred rarity rank.",
      });
    }
  } else if (data.preferredAsset === "currency") {
    if (!data.amountWantToReceive) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amountWantToReceive"],
        message: "Please enter amount you want to receive.",
      });
    }

    if (!data.currencies) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message: "Please select currencies you want to receive.",
      });
    }

    if (data.currencies && data.currencies.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message:
          "Please select at least three currencies you want to receive.",
      });
    }
  }
});

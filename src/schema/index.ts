import { z } from "zod";
import moment from "moment";


/*=== Open swap parameters schema starts ===*/

export const Schema_OpenSwapParametersForm = z.object({
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

    if (data.currencies && data.currencies.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message:
          "Please select at least one currency you want to receive.",
      });
    }

    if (data.currencies && data.currencies.length > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message:
          "You can select upto three currencies you want to receive.",
      });
    }
  }
});

/*=== Open swap parameters schema ends ===*/

/*=== My swaps filters schema starts ===*/

export const Schema_PendingMySwapsFiltersForm = z.object({
  offersFromCurrentChain: z.boolean({
    required_error: "Please enable show offers from current chain!",
  }).optional(),
  requestedDate: z.date({
    required_error: "requested date is required!",
  }).optional(),
  swapRequestStatus: z.enum(["all", "sent", "received"], {
    required_error: "Please select a swap offer status.",
  }),
  swapMode: z.enum(["all", "open-market", "private-party"], {
    required_error: "Please select a swap mode.",
  }),
}).superRefine((data, ctx) => {
  if (data.offersFromCurrentChain === false && data.requestedDate === undefined && data.swapMode === 'all' && data.swapRequestStatus === "all") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["requestedDate"],
      message: "Please select at least one filter item to apply filters.",
    });
  }
});

export const Schema_HistoryMySwapsFiltersForm = z.object({
  offersFromCurrentChain: z.boolean({
    required_error: "Please enable show offers from current chain!",
  }).optional(),
  requestedDate: z.date({
    required_error: "requested date is required!",
  }).optional(),
  swapStatus: z.enum(["all", "completed", "declined", "canceled"], {
    required_error: "Please select a swap status.",
  }),
  swapMode: z.enum(["all", "open-market", "private-party"], {
    required_error: "Please select a swap mode.",
  }),
}).superRefine((data, ctx) => {
  if (data.offersFromCurrentChain === false && data.requestedDate === undefined && data.swapMode === 'all' && data.swapStatus === "all") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["requestedDate"],
      message: "Please select at least one filter item to apply filters.",
    });
  }
});



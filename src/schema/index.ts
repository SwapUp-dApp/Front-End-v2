import { z } from "zod";
import moment from "moment";
import { isValidURL } from "@/lib/utils";


/*====================================*/
/*=== Swap market page schema's ===*/
/*====================================*/

/*=== create open swap - parameters schema starts ===*/
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

/*=== create open swap - parameters schema ends ===*/

/*=== Swap market - open market filters schema starts ===*/
export const Schema_OpenMarketFiltersForm = z.object({
  offersFromCurrentChain: z.boolean({
    required_error: "Please enable show offers from current chain!",
  }).optional(),
  offeredRarityRank: z.string().optional(),
  preferredAsset: z.enum(["any", "nft", "currency"], {
    required_error: "Please select a preferred asset.",
  }),
  collection: z.string().optional(),
  rarityRank: z.string().optional(),
  amountRangeFrom: z.string().optional(),
  amountRangeTo: z.string().optional(),
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
        message: "Please select a preferred collection you want to filter.",
      });
    }

    if (!data.rarityRank) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rarityRank"],
        message: "Please select a preferred rarity rank you want to filter.",
      });
    }
  } else if (data.preferredAsset === "currency") {

    if (!data.amountRangeFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amountRangeFrom"],
        message: "Amount range from.",
      });
    }

    if (!data.amountRangeTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amountRangeTo"],
        message: "Amount range to.",
      });
    }

    if (!data.currencies) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message: "Please select currencies you want to filter.",
      });
    }

    if (data.currencies && data.currencies.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message:
          "Please select at least one currency you want to filter.",
      });
    }

    if (data.currencies && data.currencies.length > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["currencies"],
        message:
          "You can select upto three currencies you want to filter.",
      });
    }
  }
});
/*=== Swap market - open market filters schema ends ===*/


/*=== Swap market - private market filters schema starts ===*/
export const Schema_PrivateMarketFiltersForm = z.object({
  offersFromCurrentChain: z.boolean({
    required_error: "Please enable show offers from current chain!",
  }).optional(),
  swapRequestStatus: z.enum(["all", "sent", "received"], {
    required_error: "Please select a swap offer status.",
  }),
  dateRangeFrom: z.date().optional(),
  dateRangeTo: z.date().optional(),
}).superRefine((data, ctx) => {

  if (data.dateRangeFrom && !data.dateRangeTo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dateRangeTo"],
      message: "Select a ending date.",
    });
  }

  if (!data.dateRangeFrom && data.dateRangeTo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dateRangeFrom"],
      message: "Select starting date.",
    });
  }

});
/*=== Swap market - private market filters schema ends ===*/


/*====================================*/
/*=== My Swap page schema's ===*/
/*====================================*/


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
/*=== My swaps filters schema ends ===*/


/*====================================*/
/*=== User Profile schema's ===*/
/*====================================*/

export const Schema_ProfileInfoForm = z.object({
  description: z.string(),
  twitterLink: z.string().optional(),
  warpcastLink: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.description) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["description"],
      message: "Description cannot be empty.",
    });
  }

  if (data.description && (data.description.length < 50)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["description"],
      message: "Description must be at least 50 character.",
    });
  }

  if (data.twitterLink && !isValidURL(data.twitterLink)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["twitterLink"],
      message: "Twitter link must be a valid url.",
    });
  }

  if (data.warpcastLink && !isValidURL(data.warpcastLink)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["warpcastLink"],
      message: "Warpcast link must be a valid url.",
    });
  }

});


export const Schema_ProfileAssetFiltersForm = z.object({
  collection: z.string().optional(),
  rarityRank: z.string().optional()
}).superRefine((data, ctx) => {
  if (!data.collection && !data.rarityRank) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["collection"],
      message: "Please select at least one filter item to apply filters.",
    });
  }
});
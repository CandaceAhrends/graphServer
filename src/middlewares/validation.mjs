import { z } from "zod";

// Define the schema for the stock request
const stockSchema = z.object({
  symbol: z
    .string()
    .min(1, "Symbol is required")
    .max(5, "Symbol cannot be longer than 5 characters"),
});

const detailsSchema = stockSchema.merge(
  z.object({
    details: z.record(z.unknown()),
  })
);

const dayVolumeSchema = stockSchema.merge(
  z.object({
    volume: z
      .number()
      .min(0, { message: "Volume must be a non-negative number" }) // Ensure volume is non-negative
      .max(99999999999.99, {
        message: "Volume exceeds maximum value of 99999999.99",
      }) // Ensure volume does not exceed the maximum
      .nonnegative(), // Ensures that the value is not negative (implicit check for non-null)

    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format, must be YYYY-MM-DD",
    }),
  }) // Ensure txn_date is a valid date string
);

const dateValidator = z.object({
  date: z.string().refine(
    (val) => {
      // Check if the date is valid using Date.parse
      const parsedDate = Date.parse(val);
      return !isNaN(parsedDate) && /^\d{4}-\d{2}-\d{2}$/.test(val); // Ensure date format is YYYY-MM-DD
    },
    {
      message: "Invalid date format, must be YYYY-MM-DD",
    }
  ),
});

export const validateGetDayVolumeRequest = (req, res, next) => {
  const { date } = req.query;

  try {
    dateValidator.parse({ date });
  } catch (error) {
    // Handle validation or query errors
    if (error instanceof z.ZodError) {
      // Zod validation errors
      res.status(400).json({ error: error.errors });
    } else {
      // Other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  next();
};

export const validateStockRequest = (req, res, next) => {
  const result = stockSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  next();
};

export const validateDetailsRequest = (req, res, next) => {
  const result = detailsSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  next();
};

export const validateDayVolumeRequest = (req, res, next) => {
  const result = dayVolumeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  next();
};

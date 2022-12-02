import { z } from "zod";
import { uuidSchema } from "../../utils/zod-schema/uuid";

export type UUID = z.infer<typeof uuidSchema>;

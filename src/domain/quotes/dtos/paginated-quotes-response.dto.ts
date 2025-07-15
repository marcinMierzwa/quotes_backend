import { QuoteResponseDto } from "./quote-response.dto";

export class PaginatedQuotesResponseDto {

  data: QuoteResponseDto[];
  totalItems: number;
  pageIndex: number;
  pageSize: number;

}
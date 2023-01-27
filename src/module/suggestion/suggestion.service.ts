import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createPaginationResult } from 'src/common/input/pagination.input';
import { PrismaService } from '../prisma/prisma.service';
import ReadSuggestionInput from './dto/read-suggestion.input';

@Injectable()
export class SuggestionService {
  constructor(private prisma: PrismaService) {}

  async readSuggestion(input: ReadSuggestionInput) {
    
    let whereClause: Prisma.suggestionsWhereInput = {
      suggestions_topic : input.data.suggestion_topic || {},
      suggestion_value : input.data.suggestion_value  || {},
      suggestions_date  : input.data.suggestion_date  || {},


   };
   const count = this.prisma.suggestions.count({ where: whereClause });
   const entity = this.prisma.suggestions.findMany({
       where: whereClause,
       ...input?.sortBy?.convertToPrismaFilter(),
       ...input?.pagination?.convertToPrismaFilter(),
   });
   return createPaginationResult({ count, entity });
    
  }
}

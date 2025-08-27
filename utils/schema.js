import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AiInterview=pgTable('aiInterview', {
    id:serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPostition: varchar('jobPostition').notNull(),
    jobDescription: varchar('jobDescription').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull(),
}
)

export const UserAnswer=pgTable('userAnswer', {
    id:serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: varchar('correctAnswer'),
    userAns: text('userAnswer'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail').notNull(),
    createdAt: varchar('createdAt').notNull(),
}
)

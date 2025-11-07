ALTER TABLE `accounts` MODIFY COLUMN `refresh_token_expires_at` timestamp(3) DEFAULT '2028-05-07 13:05:02.417';--> statement-breakpoint
ALTER TABLE `teacher_info` MODIFY COLUMN `created_at` timestamp(3) NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `teacher_info` MODIFY COLUMN `updated_at` timestamp(3) NOT NULL DEFAULT (now());
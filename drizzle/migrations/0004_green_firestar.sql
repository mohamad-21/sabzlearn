ALTER TABLE `accounts` MODIFY COLUMN `refresh_token_expires_at` timestamp(3) DEFAULT '2028-05-07 12:23:19.208';--> statement-breakpoint
ALTER TABLE `carts` MODIFY COLUMN `user_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role` enum('user','teacher') DEFAULT 'user';
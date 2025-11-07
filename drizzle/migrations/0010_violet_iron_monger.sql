CREATE TABLE `teachers_info` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`bio` varchar(255) NOT NULL,
	`image` varchar(255) NOT NULL DEFAULT '''https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg''',
	`telegram_id` varchar(255) DEFAULT 'NULL',
	`github_id` varchar(255) DEFAULT 'NULL',
	`instagram_id` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now())
);
--> statement-breakpoint
DROP TABLE `teacher_info`;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `refresh_token_expires_at` timestamp(3) DEFAULT '2028-05-07 13:05:35.586';
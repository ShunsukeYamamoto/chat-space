# README

## usersテーブル

|Column|type|options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false,unique: true|
|password|string|null: false|

### Asociation
- has_many :messages
- has_many :users_groups
- has_many :groups,through: :users_groups

## groupsテーブル

|Column|type|options|
|------|----|-------|
|name|string|null: false|

### Asociation
- has_many :messages
- has_many :users_groups
- has_many :users,through: :users_groups

## users_groupsテーブル

|Column|type|options|
|------|----|-------|
|user_id|integer|foreign_key: true,null: false|
|group_id|integer|foreign_key: true,null: false|

### Asociation
- belongs_to :user
- belongs_to :group

## messagesテーブル

|Column|type|options|
|------|----|-------|
|body|text|null: false|
|image|text||
|user_id|integr|null: false,foreign_key: true|
|group_id|integer|null: false,foleign_key: true|

### Association
- belongs_to :user
- belongs_to :group





This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

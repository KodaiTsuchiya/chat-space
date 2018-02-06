# README


# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|email|varchar(255)|null: false, unique: true|
|encrypted_password|varchar(255)|null: false|
|name|varchar(255)|null: false|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|


### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar(255)|null: false, unique: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|


### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|


### Association
- belongs_to :group
- belongs_to :user


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|created_at|datetime|null: false|
|updated_at|datetime|null: false|


### Association
- references :group
- references :user

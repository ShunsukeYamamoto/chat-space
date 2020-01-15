class Group < ApplicationRecord
  validates :name, presence: true, null: false
  has_many :users, through: :group_users
  has_many :group_users
end

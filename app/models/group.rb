class Group < ApplicationRecord
  validates :name, presence: true, null: false
  has_many :users, through: :group_users
  has_many :group_users
  has_many :messages

def show_last_message
  last_message = messages.last
  if last_message.present?
    if last_message.content.present?
      last_message.content
    else
      "画像が投稿されています"
    end
  else
    "まだ投稿がありません"
  end
end

end

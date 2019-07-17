class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_latest_message
    if (latest_message = messages.last).present?
      latest_message.content? ? latest_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
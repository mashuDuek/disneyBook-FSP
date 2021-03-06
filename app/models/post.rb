# == Schema Information
#
# Table name: posts
#
#  id          :bigint(8)        not null, primary key
#  author_id   :integer          not null
#  receiver_id :integer          not null
#  body        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_posts_on_author_id    (author_id)
#  index_posts_on_receiver_id  (receiver_id)
#

class Post < ApplicationRecord
  validates :author, :receiver_id, :body, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :receiver,
    foreign_key: :receiver_id,
    class_name: :User
    
  has_many :comments,
    foreign_key: :post_id,
    class_name: :Comment

  has_many :likes,
    foreign_key: :post_id,
    class_name: :Like
    
end

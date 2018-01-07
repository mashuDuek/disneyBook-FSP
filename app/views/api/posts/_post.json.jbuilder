json.extract!(post, :id, :body, :author_id, :receiver_id)
json.comments do
  json.array! post.comments, partial: 'api/comments/comment', as: :comment
end
json.author do
  json.id post.author.id
  json.name post.author.name
  json.email post.author.email
  json.profilePicUrl post.author.profilePicUrl
end

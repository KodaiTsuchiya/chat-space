json.array! @latestMessages do |message|
  json.id message.id
  json.name message.user.name
  json.created_at message.created_at
  json.body message.body
  json.image message.image.url
end

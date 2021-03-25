json.extract! @product, :id, :name, :price, :image_url

json.reviews do
  json.array! @reviews do |review|
    json.extract! review, :id, :author, :content, :score, :created_at
  end
end
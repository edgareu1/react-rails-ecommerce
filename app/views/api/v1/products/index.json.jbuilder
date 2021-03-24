json.array! @products do |product|
  json.extract! product, :id, :name, :price, :image_url
end

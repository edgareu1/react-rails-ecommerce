class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :author
      t.string :content
      t.integer :score
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end

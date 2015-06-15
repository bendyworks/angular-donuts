class CreateDonuts < ActiveRecord::Migration
  def change
    create_table :donuts do |t|
      t.string :flavor
      t.float :calories
      t.string :brand
      t.integer :shape
      t.string :title
      t.string :country

      t.timestamps null: false
    end
  end
end

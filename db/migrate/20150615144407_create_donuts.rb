class CreateDonuts < ActiveRecord::Migration
  def change
    create_table :donuts do |t|
      t.string :flavor, null: false
      t.float :calories, null: false
      t.string :brand
      t.integer :shape, null: false
      t.string :title, null: false
      t.string :country

      t.timestamps null: false
    end
  end
end

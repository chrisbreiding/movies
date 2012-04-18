class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.string :rt_title
      t.boolean :chris
      t.boolean :sarah
      t.boolean :shortlist

      t.timestamps
    end
  end
end

class ChangeRtTitleToRtId < ActiveRecord::Migration
  def change
  	rename_column :movies, :rt_title, :rt_id
  end
end

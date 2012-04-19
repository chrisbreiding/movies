class AddDefaults < ActiveRecord::Migration
  def up
  	change_column_default :movies, :chris, false
  	change_column_default :movies, :sarah, false
  	change_column_default :movies, :shortlist, false
  end

  def down
  	change_column_default :movies, :chris, nil
  	change_column_default :movies, :sarah, nil
  	change_column_default :movies, :shortlist, nil
  end
end

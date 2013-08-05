class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :chris, :sarah, :shortlist, :rt_id
  has_many :genres
  embed :ids, include: true
end

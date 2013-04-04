class Micropost < ActiveRecord::Base
  attr_accessible :content, :user_id
  belongs to :user

  validates :content, :length => { :maximum => 140 }
end

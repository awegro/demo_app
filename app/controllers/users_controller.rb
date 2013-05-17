class UsersController < ApplicationController
  # GET /users
  # GET /users.json
  def index
        haml :contact
        
    end 

  def new
        name = params[:name]
        mail = params[:mail]
        body = params[:body]

       Pony.mail({
        :to => 'andrew@awegroup.com',
        :from => 'me@example.com', :subject => 'hi', :body => 'Hello there.',
        :via => :smtp,
        :via_options => {
        :address              => 'smtp.gmail.com',
        :port                 => '587',
        :enable_starttls_auto => true,
        :user_name            => 'awegrotesting',
        :password             => '0pensaysme123',
        :authentication       => :plain, # :plain, :login, :cram_md5, no auth by default
        :domain               => "localhost.localdomain" # the HELO domain provided by the client to the server
  }
})

        haml :contact
    end
end

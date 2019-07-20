class Api::MessagesController < ApplicationController
  def index
    # @group = Group.find(params[:group_id])
    # @message = Message.new
    @messages = Message.includes(:user).where('id > ?', params[:id])
    # respond_to do |format|
    #   format.json { @new_message = @messages.where('id > ?', params[:id]) }
    #   format.html
    # end
  end
end
require 'rails_helper'

describe Message do
  describe '#create' do
    it "is valid with content" do
      message = build(:message,image: nil)
      message.invalid?
      expect(message).to be_valid
    end

    it "is valid with image" do
      expect(build(:message,content: "")).to be_valid
    end

    it "is valid with contet and message" do
      expect(build(:message)).to be_valid
    end

    it "is invalid without content and message" do
      message = build(:message,content: nil,image: nil)
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
    end

    it "is invalid without :group_id" do
      message = build(:message,group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "is invalid without :user_id" do
      message = build(:message,user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end
class DonutsController < ApplicationController
  before_action :set_donut, only: [:show, :edit, :update, :destroy]

  # GET /donuts
  # GET /donuts.json
  def index
    @donuts = Donut.all
  end

  # GET /donuts/1
  # GET /donuts/1.json
  def show
  end

  # GET /donuts/new
  def new
    @donut = Donut.new
  end

  # GET /donuts/1/edit
  def edit
  end

  # POST /donuts
  # POST /donuts.json
  def create
    @donut = Donut.new(donut_params)

    respond_to do |format|
      if @donut.save
        format.html { redirect_to @donut, notice: 'Donut was successfully created.' }
        format.json { render :show, status: :created, location: @donut }
      else
        format.html { render :new }
        format.json { render json: @donut.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /donuts/1
  # PATCH/PUT /donuts/1.json
  def update
    respond_to do |format|
      if @donut.update(donut_params)
        format.html { redirect_to @donut, notice: 'Donut was successfully updated.' }
        format.json { render :show, status: :ok, location: @donut }
      else
        format.html { render :edit }
        format.json { render json: @donut.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /donuts/1
  # DELETE /donuts/1.json
  def destroy
    @donut.destroy
    respond_to do |format|
      format.html { redirect_to donuts_url, notice: 'Donut was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_donut
      @donut = Donut.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def donut_params
      params.require(:donut).permit(:flavor, :calories, :brand, :shape, :title, :country)
    end
end

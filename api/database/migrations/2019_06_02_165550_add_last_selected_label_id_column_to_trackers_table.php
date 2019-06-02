<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLastSelectedLabelIdColumnToTrackersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('trackers', function (Blueprint $table) {
            $table->integer('last_selected_label_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('trackers', function (Blueprint $table) {
            $table->dropColumn('last_selected_label_id');
        });
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Funcionalidade extends Model
{
    protected $fillable =  ['nome','rota','modulo_id'];

    /**
     * Get the user that owns the phone.
     */
    public function modulo()
    {
        return $this->belongsTo('App\Modulo', 'modulo_id');
    }

    /**
     * Get the user that owns the phone.
     */
    public function perfis()
    {
        return $this->belongsToMany('App\Perfil', 'perfil_funcionalidade');
    }
}

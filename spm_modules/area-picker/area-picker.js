define(function (require,exports,module) {

    var base = require('base'),
        apiHost = base.apiHost;

    var $ = require('jquery');

    var xhr = require('xhr'),
        json = xhr.json,
        doneCallback = xhr.done,
        failCallback = xhr.fail;

    var template = require('template');

    var systemMessage = require('system-message');

    var EventProxy = require('event-proxy'),
        proxy = new EventProxy();


    var tpl =
        '<% $each(data.content, function(item, i){ %>' +
        '<option value="<%= item.id %>"><%= item.name %></option>' +
        '<% }); %>',

        getTplTit = function (tit) { return '<option selected="selected" value="">' + tit + '</option>'; },

        bigAreaTplTit = getTplTit('请选择大区'),
        bigAreaTpl = bigAreaTplTit + tpl,
        bigAreaRender = template.compile(bigAreaTpl),

        provinceTplTit = getTplTit('请选择省份'),
        provinceTpl = provinceTplTit + tpl,
        provinceRender = template.compile(provinceTpl),

        cityTplTit = getTplTit('请选择城市'),
        cityTpl = cityTplTit + tpl,
        cityRender = template.compile(cityTpl),

        areaTplTit = getTplTit('请选择区'),
        areaTpl = areaTplTit + tpl,
        areaRender = template.compile(areaTpl),

        villageTplTit = getTplTit('请选择小区'),
        villageTpl = areaTplTit + tpl,
        villageRender = template.compile(villageTpl);



    function fixCallbackData(data) {
        var newData = {
            status: '1',
            data: {
                content: $.isArray(data) ? data : []
            }
        };
        return newData;
    }

    /**
     * 获取所有大区列表
     * @param callback
     */
    function getBigAreaList(callback) {
        $.ajax($.extend({
            url: apiHost + '/base/sys/getAllBigAreaList.do',
            beforeSend: function () {}
        }, json)).
        done(function (data) {
            if (!$.isFunction(callback)) {
                callback = function () {};
            }
            doneCallback.call(this, data, callback);
        }).
        fail(function (jqXHR) {
            failCallback.call(this, jqXHR, '获取所有大区失败！');
        });
    }

    /**
     * 获取所有省份列表
     * @param bigAreaId
     * @param callback
     */
    function getProvinceList(bigAreaId, callback) {
        // 默认获取所有省份
        var params = {
            type: 'p'
        };

        // 仅获取大区下面的省份
        if (bigAreaId) {
            params.bigAreaId = bigAreaId;
        }

        $.ajax($.extend({
            url: apiHost + '/pcav/q.do',
            data: params,
            beforeSend: function () {}
        }, json)).
        done(function (data) {
            if(data && data.status === '-99'){
                systemMessage(data.detail);     // 请登录
                window.location.href = '/hw-sq-run-web/app/account/login.html';
            }
            data = fixCallbackData(data);
            if (!$.isFunction(callback)) {
                callback = function (data) {};
            }
            doneCallback.call(this, data, callback);
        }).
        fail(function (jqXHR) {
            failCallback.call(this, jqXHR, '获取所有省份列表失败！');
        });
    }

    /**
     * 根据省份ID获取城市列表
     * @param provinceId
     * @param callback
     */
    function getCityListByProvinceId(provinceId, callback) {
        var params = {
            type: 'c'
        };

        if (!provinceId) {
            systemMessage('缺少省份ID！');
            return;
        }

        params.word = provinceId;

        $.ajax($.extend({
            url: apiHost + '/pcav/q.do',
            data: params,
            beforeSend: function () {}
        }, json)).
        done(function (data) {
            if(data && data.status === '-99'){
                systemMessage(data.detail);     // 请登录
                window.location.href = '/hw-sq-run-web/app/account/login.html';
            }
            data = fixCallbackData(data);
            if (!$.isFunction(callback)) {
                callback = function (data) {};
            }
            doneCallback.call(this, data, callback);
        }).
        fail(function (jqXHR) {
            failCallback.call(this, jqXHR, '根据省份ID获取城市列表失败！');
        });
    }

    /**
     * 根据大区ID获取城市列表
     * @param bigAreaId
     * @param callback
     */
    function getCityListByBigAreaId(bigAreaId, callback) {
        var params = {};

        if (!bigAreaId) {
            systemMessage('缺少大区ID！');
            return;
        }

        params.bigAreaId = bigAreaId;

        $.ajax($.extend({
            url: apiHost + '/base/sys/getAllCityListByBigAreaId.do',
            data: params,
            beforeSend: function () {}
        }, json)).
        done(function (data) {
            if (!$.isFunction(callback)) {
                callback = function () {};
            }
            doneCallback.call(this, data, callback);
        }).
        fail(function (jqXHR) {
            failCallback.call(this, jqXHR, '根据大区ID获取城市列表失败！');
        });
    }

    /**
     * 根据城市ID获取所有地区列表
     * @param cityId
     * @param callback
     */
    function getAreaList(cityId, callback) {
        var params = {
            type: 'a'
        };

        if (!cityId) {
            systemMessage('缺少城市ID！');
            return;
        }

        params.word = cityId;

        $.ajax($.extend({
            url: apiHost + '/pcav/q.do',
            data: params,
            beforeSend: function () {}
        }, json)).
        done(function (data) {
            data = fixCallbackData(data);
            if (!$.isFunction(callback)) {
                callback = function (data) {};
            }
            doneCallback.call(this, data, callback);
        }).
        fail(function (jqXHR) {
            failCallback.call(this, jqXHR, '根据城市ID获取所有地区列表失败！');
        });
    }

    /**
     * 根据区ID获取小区列表
     * @param areaId
     * @param callback
     */
    function getVillageList(areaId, callback) {
        var params = {
            type: 'v'
        };

        if (!areaId) {
            systemMessage('缺少小区ID！');
            return;
        }

        params.word = areaId;

        $.ajax($.extend({
            url: apiHost + '/pcav/q.do',
            data: params,
            beforeSend: function () {}
        }, json)).
            done(function (data) {
                data = fixCallbackData(data);
                if (!$.isFunction(callback)) {
                    callback = function (data) {};
                }
                doneCallback.call(this, data, callback);
            }).
            fail(function (jqXHR) {
                failCallback.call(this, jqXHR, '根据区ID获取小区列表失败！');
            });
    }



    /**
     * 大区 --> 市
     * @param $bigArea
     * @param $city
     */
    function bigAreaToCity($bigArea, $city) {
        $city.
            html(cityTplTit).
            prop('disabled', true);

        function bacBigAreaList(data) {
            $bigArea.html(
                bigAreaRender(data)
            );

            $bigArea.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    bigAreaId = $.trim($context.val());

                if (bigAreaId === '') {
                    $city.
                        html(cityTplTit).
                        prop('disabled', true);
                    return false;
                }

                getCityListByBigAreaId(bigAreaId, function (data) {
                    proxy.trigger('bacCityListByBigAreaId', data);
                });
            });
        }
        proxy.on('bacBigAreaList', bacBigAreaList);

        function bacCityListByBigAreaId(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $city.
                    html(cityTplTit).
                    prop('disabled', true);
                return false;
            }

            $city.
                html(cityRender(data)).
                prop('disabled', false);
        }
        proxy.on('bacCityListByBigAreaId', bacCityListByBigAreaId);

        getBigAreaList(function (data) {
            proxy.trigger('bacBigAreaList', data);
        });
    }


    /**
     * 大区 --> 省 --> 市
     * @param $bigArea
     * @param $province
     * @param $city
     */
    function bigAreaToProvinceToCity($bigArea, $province, $city) {
        $province.
            html(provinceTplTit).
            prop('disabled', true);
        $city.html(cityTplTit).
            prop('disabled', true);

        function bapcBigAreaList(data) {
            $bigArea.html(
                bigAreaRender(data)
            );

            $bigArea.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    bigAreaId = $.trim($context.val());

                if (bigAreaId === '') {
                    $province.
                        html(provinceTplTit).
                        prop('disabled', true);
                    $city.html(cityTplTit).
                        prop('disabled', true);
                    return false;
                }

                getProvinceList(bigAreaId, function (data) {
                    proxy.trigger('bapcProvinceList', data);
                });
            });
        }
        proxy.on('bapcBigAreaList', bapcBigAreaList);

        function bapcProvinceList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $province.
                    html(provinceTplTit).
                    prop('disabled', true);
                return false;
            }

            $city.html(cityTplTit).
                prop('disabled', true);

            $province.
                html(provinceRender(data)).
                prop('disabled', false);

            $province.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    provinceId = $.trim($context.val());

                if (provinceId === '') {
                    $city.html(cityTplTit).
                        prop('disabled', true);
                    return false;
                }

                getCityListByProvinceId(provinceId, function (data) {
                    proxy.trigger('bapcCityList', data);
                });
            });
        }
        proxy.on('bapcProvinceList', bapcProvinceList);

        function bapcCityList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $city.
                    html(cityTplTit).
                    prop('disabled', true);
                return false;
            }

            $city.
                html(cityRender(data)).
                prop('disabled', false);
        }
        proxy.on('bapcCityList', bapcCityList);

        getBigAreaList(function (data) {
            proxy.trigger('bapcBigAreaList', data);
        });
    }



    /**
     * 省 --> 市
     * @param $province
     * @param $city
     */
    function provinceToCity($province, $city, pId, cId) {
        // 默认选中，初始化时
        $province.one('change.selected', function (e, id) {
            setSelectedById($province, id);
            $province.trigger('change');
        });
        $city.one('change.selected', function (e, id) {
            setSelectedById($city, id);
        });

        $city.
            html(cityTplTit).
            prop('disabled', true);

        function pcProvinceList(data) {
            $province.html(
                provinceRender(data)
            );

            $province.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    provinceId = $.trim($context.val());

                if (provinceId === '') {
                    $city.
                        html(cityTplTit).
                        prop('disabled', true);
                    return false;
                }

                getCityListByProvinceId(provinceId, function (data) {
                    proxy.trigger('pcCityList_3', data);
                });
            });

            $province.trigger('change.selected', pId);
        }
        proxy.on('pcProvinceList_3', pcProvinceList);

        function pcCityList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $city.
                    html(cityTplTit).
                    prop('disabled', true);
                return false;
            }

            $city.
                html(cityRender(data)).
                prop('disabled', false);

            $city.trigger('change.selected', cId);
        }
        proxy.on('pcCityList_3', pcCityList);

        getProvinceList(null, function (data) {
            proxy.trigger('pcProvinceList_3', data);
        });
    }

    /**
     * 省 --> 市 --> 区
     * @param $province
     * @param $city
     * @param $area
     */
    function provinceToCityToArea($province, $city, $area) {
        $city.
            html(cityTplTit).
            prop('disabled', true);
        $area.html(areaTplTit).
            prop('disabled', true);

        function pcaProvinceList(data) {
            $province.html(
                provinceRender(data)
            );

            $province.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    provinceId = $.trim($context.val());

                if (provinceId === '') {
                    $city.
                        html(cityTplTit).
                        prop('disabled', true);
                    $area.html(areaTplTit).
                        prop('disabled', true);
                    return false;
                }

                getCityListByProvinceId(provinceId, function (data) {
                    proxy.trigger('pcaCityList_2', data);
                });
            });
        }
        proxy.on('pcaProvinceList_2', pcaProvinceList);

        function pcaCityList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $city.
                    html(cityTplTit).
                    prop('disabled', true);
                return false;
            }

            $area.html(areaTplTit).
                prop('disabled', true);

            $city.
                html(cityRender(data)).
                prop('disabled', false);

            $city.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    cityId = $.trim($context.val());

                if (cityId === '') {
                    $area.html(areaTplTit).
                        prop('disabled', true);
                    return false;
                }

                getAreaList(cityId, function (data) {
                    proxy.trigger('pcaAreaList_2', data);
                });
            });
        }
        proxy.on('pcaCityList_2', pcaCityList);

        function pcaAreaList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $area.
                    html(areaTplTit).
                    prop('disabled', true);
                return false;
            }

            $area.
                html(areaRender(data)).
                prop('disabled', false);
        }
        proxy.on('pcaAreaList_2', pcaAreaList);

        getProvinceList(null, function (data) {
            proxy.trigger('pcaProvinceList_2', data);
        });
    }

    /**
     * 省 --> 市 --> 区 --> 小区
     * @param $province
     * @param $city
     * @param $area
     * @param $village
     */
    function provinceToCityToAreaToVillage($province, $city, $area, $village) {
        $city.
            html(cityTplTit).
            prop('disabled', true);
        $area.html(areaTplTit).
            prop('disabled', true);
        $village.html(villageTplTit).
            prop('disabled', true);

        function pcavProvinceList(data) {
            $province.html(
                provinceRender(data)
            );

            $province.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    provinceId = $.trim($context.val());

                if (provinceId === '') {
                    $city.
                        html(cityTplTit).
                        prop('disabled', true);
                    $area.html(areaTplTit).
                        prop('disabled', true);
                    $village.html(villageTplTit).
                        prop('disabled', true);
                    return false;
                }

                getCityListByProvinceId(provinceId, function (data) {
                    proxy.trigger('pcavCityList', data);
                });
            });
        }
        proxy.on('pcavProvinceList', pcavProvinceList);

        function pcavCityList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $city.
                    html(cityTplTit).
                    prop('disabled', true);
                return false;
            }

            $area.html(areaTplTit).
                prop('disabled', true);
            $village.html(villageTplTit).
                prop('disabled', true);

            $city.
                html(cityRender(data)).
                prop('disabled', false);

            $city.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    cityId = $.trim($context.val());

                if (cityId === '') {
                    $area.html(areaTplTit).
                        prop('disabled', true);
                    return false;
                }

                getAreaList(cityId, function (data) {
                    proxy.trigger('pcavAreaList', data);
                });
            });
        }
        proxy.on('pcavCityList', pcavCityList);

        function pcavAreaList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $area.
                    html(areaTplTit).
                    prop('disabled', true);
                return false;
            }

            $village.html(villageTplTit).
                prop('disabled', true);

            $area.
                html(areaRender(data)).
                prop('disabled', false);

            $area.off('change.ns').on('change.ns', function () {
                var $context = $(this),
                    areaId = $.trim($context.val());

                if (areaId === '') {
                    $area.html(areaTplTit).
                        prop('disabled', true);
                    return false;
                }

                getVillageList(areaId, function (data) {
                    proxy.trigger('pcavVillageList', data);
                });
            });
        }
        proxy.on('pcavAreaList', pcavAreaList);

        function pcavVillageList(data) {
            var dataObj = data.data || {};

            if (!$.isArray(dataObj.content) || !dataObj.content.length) {
                $village.
                    html(areaTplTit).
                    prop('disabled', true);
                return false;
            }

            $area.
                html(areaRender(data)).
                prop('disabled', false);
        }
        proxy.on('pcavVillageList', pcavVillageList);

        getProvinceList(null, function (data) {
            proxy.trigger('pcavProvinceList', data);
        });
    }

    /**
     * 根据 option 的值 id ，设置该 option 为选中
     * @param $select
     * @param id
     */
    function setSelectedById($select, id) {
        try {
            $select.find('[value='+ id +']').prop('selected', true);
        } catch (e) {}
    }


    return {
        // bigAreaToCity: bigAreaToCity,
        // bigAreaToProvinceToCity: bigAreaToProvinceToCity,
        provinceToCity: provinceToCity,
        provinceToCityToArea: provinceToCityToArea,
        provinceToCityToAreaToVillage: provinceToCityToAreaToVillage
    };

});
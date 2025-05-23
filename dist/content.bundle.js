(function () {
  'use strict';

  // these aren't really private, but nor are they really useful to document

  /**
   * @private
   */
  class LuxonError extends Error {}

  /**
   * @private
   */
  class InvalidDateTimeError extends LuxonError {
    constructor(reason) {
      super(`Invalid DateTime: ${reason.toMessage()}`);
    }
  }

  /**
   * @private
   */
  class InvalidIntervalError extends LuxonError {
    constructor(reason) {
      super(`Invalid Interval: ${reason.toMessage()}`);
    }
  }

  /**
   * @private
   */
  class InvalidDurationError extends LuxonError {
    constructor(reason) {
      super(`Invalid Duration: ${reason.toMessage()}`);
    }
  }

  /**
   * @private
   */
  class ConflictingSpecificationError extends LuxonError {}

  /**
   * @private
   */
  class InvalidUnitError extends LuxonError {
    constructor(unit) {
      super(`Invalid unit ${unit}`);
    }
  }

  /**
   * @private
   */
  class InvalidArgumentError extends LuxonError {}

  /**
   * @private
   */
  class ZoneIsAbstractError extends LuxonError {
    constructor() {
      super("Zone is an abstract class");
    }
  }

  /**
   * @private
   */

  const n = "numeric",
    s = "short",
    l = "long";

  const DATE_SHORT = {
    year: n,
    month: n,
    day: n,
  };

  const DATE_MED = {
    year: n,
    month: s,
    day: n,
  };

  const DATE_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s,
  };

  const DATE_FULL = {
    year: n,
    month: l,
    day: n,
  };

  const DATE_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
  };

  const TIME_SIMPLE = {
    hour: n,
    minute: n,
  };

  const TIME_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
  };

  const TIME_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s,
  };

  const TIME_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l,
  };

  const TIME_24_SIMPLE = {
    hour: n,
    minute: n,
    hourCycle: "h23",
  };

  const TIME_24_WITH_SECONDS = {
    hour: n,
    minute: n,
    second: n,
    hourCycle: "h23",
  };

  const TIME_24_WITH_SHORT_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hourCycle: "h23",
    timeZoneName: s,
  };

  const TIME_24_WITH_LONG_OFFSET = {
    hour: n,
    minute: n,
    second: n,
    hourCycle: "h23",
    timeZoneName: l,
  };

  const DATETIME_SHORT = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
  };

  const DATETIME_SHORT_WITH_SECONDS = {
    year: n,
    month: n,
    day: n,
    hour: n,
    minute: n,
    second: n,
  };

  const DATETIME_MED = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
  };

  const DATETIME_MED_WITH_SECONDS = {
    year: n,
    month: s,
    day: n,
    hour: n,
    minute: n,
    second: n,
  };

  const DATETIME_MED_WITH_WEEKDAY = {
    year: n,
    month: s,
    day: n,
    weekday: s,
    hour: n,
    minute: n,
  };

  const DATETIME_FULL = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    timeZoneName: s,
  };

  const DATETIME_FULL_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: s,
  };

  const DATETIME_HUGE = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    timeZoneName: l,
  };

  const DATETIME_HUGE_WITH_SECONDS = {
    year: n,
    month: l,
    day: n,
    weekday: l,
    hour: n,
    minute: n,
    second: n,
    timeZoneName: l,
  };

  /**
   * @interface
   */
  class Zone {
    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    get type() {
      throw new ZoneIsAbstractError();
    }

    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */
    get name() {
      throw new ZoneIsAbstractError();
    }

    /**
     * The IANA name of this zone.
     * Defaults to `name` if not overwritten by a subclass.
     * @abstract
     * @type {string}
     */
    get ianaName() {
      return this.name;
    }

    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */
    get isUniversal() {
      throw new ZoneIsAbstractError();
    }

    /**
     * Returns the offset's common name (such as EST) at the specified timestamp
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the name
     * @param {Object} opts - Options to affect the format
     * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
     * @param {string} opts.locale - What locale to return the offset name in.
     * @return {string}
     */
    offsetName(ts, opts) {
      throw new ZoneIsAbstractError();
    }

    /**
     * Returns the offset's value as a string
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(ts, format) {
      throw new ZoneIsAbstractError();
    }

    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     * @abstract
     * @param {number} ts - Epoch milliseconds for which to compute the offset
     * @return {number}
     */
    offset(ts) {
      throw new ZoneIsAbstractError();
    }

    /**
     * Return whether this Zone is equal to another zone
     * @abstract
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(otherZone) {
      throw new ZoneIsAbstractError();
    }

    /**
     * Return whether this Zone is valid.
     * @abstract
     * @type {boolean}
     */
    get isValid() {
      throw new ZoneIsAbstractError();
    }
  }

  let singleton$1 = null;

  /**
   * Represents the local zone for this JavaScript environment.
   * @implements {Zone}
   */
  class SystemZone extends Zone {
    /**
     * Get a singleton instance of the local zone
     * @return {SystemZone}
     */
    static get instance() {
      if (singleton$1 === null) {
        singleton$1 = new SystemZone();
      }
      return singleton$1;
    }

    /** @override **/
    get type() {
      return "system";
    }

    /** @override **/
    get name() {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    /** @override **/
    get isUniversal() {
      return false;
    }

    /** @override **/
    offsetName(ts, { format, locale }) {
      return parseZoneInfo(ts, format, locale);
    }

    /** @override **/
    formatOffset(ts, format) {
      return formatOffset(this.offset(ts), format);
    }

    /** @override **/
    offset(ts) {
      return -new Date(ts).getTimezoneOffset();
    }

    /** @override **/
    equals(otherZone) {
      return otherZone.type === "system";
    }

    /** @override **/
    get isValid() {
      return true;
    }
  }

  const dtfCache = new Map();
  function makeDTF(zoneName) {
    let dtf = dtfCache.get(zoneName);
    if (dtf === undefined) {
      dtf = new Intl.DateTimeFormat("en-US", {
        hour12: false,
        timeZone: zoneName,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        era: "short",
      });
      dtfCache.set(zoneName, dtf);
    }
    return dtf;
  }

  const typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    era: 3,
    hour: 4,
    minute: 5,
    second: 6,
  };

  function hackyOffset(dtf, date) {
    const formatted = dtf.format(date).replace(/\u200E/g, ""),
      parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted),
      [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
    return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
  }

  function partsOffset(dtf, date) {
    const formatted = dtf.formatToParts(date);
    const filled = [];
    for (let i = 0; i < formatted.length; i++) {
      const { type, value } = formatted[i];
      const pos = typeToPos[type];

      if (type === "era") {
        filled[pos] = value;
      } else if (!isUndefined(pos)) {
        filled[pos] = parseInt(value, 10);
      }
    }
    return filled;
  }

  const ianaZoneCache = new Map();
  /**
   * A zone identified by an IANA identifier, like America/New_York
   * @implements {Zone}
   */
  class IANAZone extends Zone {
    /**
     * @param {string} name - Zone name
     * @return {IANAZone}
     */
    static create(name) {
      let zone = ianaZoneCache.get(name);
      if (zone === undefined) {
        ianaZoneCache.set(name, (zone = new IANAZone(name)));
      }
      return zone;
    }

    /**
     * Reset local caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCache() {
      ianaZoneCache.clear();
      dtfCache.clear();
    }

    /**
     * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
     * @param {string} s - The string to check validity on
     * @example IANAZone.isValidSpecifier("America/New_York") //=> true
     * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
     * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
     * @return {boolean}
     */
    static isValidSpecifier(s) {
      return this.isValidZone(s);
    }

    /**
     * Returns whether the provided string identifies a real zone
     * @param {string} zone - The string to check
     * @example IANAZone.isValidZone("America/New_York") //=> true
     * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
     * @example IANAZone.isValidZone("Sport~~blorp") //=> false
     * @return {boolean}
     */
    static isValidZone(zone) {
      if (!zone) {
        return false;
      }
      try {
        new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
        return true;
      } catch (e) {
        return false;
      }
    }

    constructor(name) {
      super();
      /** @private **/
      this.zoneName = name;
      /** @private **/
      this.valid = IANAZone.isValidZone(name);
    }

    /**
     * The type of zone. `iana` for all instances of `IANAZone`.
     * @override
     * @type {string}
     */
    get type() {
      return "iana";
    }

    /**
     * The name of this zone (i.e. the IANA zone name).
     * @override
     * @type {string}
     */
    get name() {
      return this.zoneName;
    }

    /**
     * Returns whether the offset is known to be fixed for the whole year:
     * Always returns false for all IANA zones.
     * @override
     * @type {boolean}
     */
    get isUniversal() {
      return false;
    }

    /**
     * Returns the offset's common name (such as EST) at the specified timestamp
     * @override
     * @param {number} ts - Epoch milliseconds for which to get the name
     * @param {Object} opts - Options to affect the format
     * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
     * @param {string} opts.locale - What locale to return the offset name in.
     * @return {string}
     */
    offsetName(ts, { format, locale }) {
      return parseZoneInfo(ts, format, locale, this.name);
    }

    /**
     * Returns the offset's value as a string
     * @override
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(ts, format) {
      return formatOffset(this.offset(ts), format);
    }

    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     * @override
     * @param {number} ts - Epoch milliseconds for which to compute the offset
     * @return {number}
     */
    offset(ts) {
      if (!this.valid) return NaN;
      const date = new Date(ts);

      if (isNaN(date)) return NaN;

      const dtf = makeDTF(this.name);
      let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts
        ? partsOffset(dtf, date)
        : hackyOffset(dtf, date);

      if (adOrBc === "BC") {
        year = -Math.abs(year) + 1;
      }

      // because we're using hour12 and https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
      const adjustedHour = hour === 24 ? 0 : hour;

      const asUTC = objToLocalTS({
        year,
        month,
        day,
        hour: adjustedHour,
        minute,
        second,
        millisecond: 0,
      });

      let asTS = +date;
      const over = asTS % 1000;
      asTS -= over >= 0 ? over : 1000 + over;
      return (asUTC - asTS) / (60 * 1000);
    }

    /**
     * Return whether this Zone is equal to another zone
     * @override
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(otherZone) {
      return otherZone.type === "iana" && otherZone.name === this.name;
    }

    /**
     * Return whether this Zone is valid.
     * @override
     * @type {boolean}
     */
    get isValid() {
      return this.valid;
    }
  }

  // todo - remap caching

  let intlLFCache = {};
  function getCachedLF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let dtf = intlLFCache[key];
    if (!dtf) {
      dtf = new Intl.ListFormat(locString, opts);
      intlLFCache[key] = dtf;
    }
    return dtf;
  }

  const intlDTCache = new Map();
  function getCachedDTF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let dtf = intlDTCache.get(key);
    if (dtf === undefined) {
      dtf = new Intl.DateTimeFormat(locString, opts);
      intlDTCache.set(key, dtf);
    }
    return dtf;
  }

  const intlNumCache = new Map();
  function getCachedINF(locString, opts = {}) {
    const key = JSON.stringify([locString, opts]);
    let inf = intlNumCache.get(key);
    if (inf === undefined) {
      inf = new Intl.NumberFormat(locString, opts);
      intlNumCache.set(key, inf);
    }
    return inf;
  }

  const intlRelCache = new Map();
  function getCachedRTF(locString, opts = {}) {
    const { base, ...cacheKeyOpts } = opts; // exclude `base` from the options
    const key = JSON.stringify([locString, cacheKeyOpts]);
    let inf = intlRelCache.get(key);
    if (inf === undefined) {
      inf = new Intl.RelativeTimeFormat(locString, opts);
      intlRelCache.set(key, inf);
    }
    return inf;
  }

  let sysLocaleCache = null;
  function systemLocale() {
    if (sysLocaleCache) {
      return sysLocaleCache;
    } else {
      sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
      return sysLocaleCache;
    }
  }

  const intlResolvedOptionsCache = new Map();
  function getCachedIntResolvedOptions(locString) {
    let opts = intlResolvedOptionsCache.get(locString);
    if (opts === undefined) {
      opts = new Intl.DateTimeFormat(locString).resolvedOptions();
      intlResolvedOptionsCache.set(locString, opts);
    }
    return opts;
  }

  const weekInfoCache = new Map();
  function getCachedWeekInfo(locString) {
    let data = weekInfoCache.get(locString);
    if (!data) {
      const locale = new Intl.Locale(locString);
      // browsers currently implement this as a property, but spec says it should be a getter function
      data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
      // minimalDays was removed from WeekInfo: https://github.com/tc39/proposal-intl-locale-info/issues/86
      if (!("minimalDays" in data)) {
        data = { ...fallbackWeekSettings, ...data };
      }
      weekInfoCache.set(locString, data);
    }
    return data;
  }

  function parseLocaleString(localeStr) {
    // I really want to avoid writing a BCP 47 parser
    // see, e.g. https://github.com/wooorm/bcp-47
    // Instead, we'll do this:

    // a) if the string has no -u extensions, just leave it alone
    // b) if it does, use Intl to resolve everything
    // c) if Intl fails, try again without the -u

    // private subtags and unicode subtags have ordering requirements,
    // and we're not properly parsing this, so just strip out the
    // private ones if they exist.
    const xIndex = localeStr.indexOf("-x-");
    if (xIndex !== -1) {
      localeStr = localeStr.substring(0, xIndex);
    }

    const uIndex = localeStr.indexOf("-u-");
    if (uIndex === -1) {
      return [localeStr];
    } else {
      let options;
      let selectedStr;
      try {
        options = getCachedDTF(localeStr).resolvedOptions();
        selectedStr = localeStr;
      } catch (e) {
        const smaller = localeStr.substring(0, uIndex);
        options = getCachedDTF(smaller).resolvedOptions();
        selectedStr = smaller;
      }

      const { numberingSystem, calendar } = options;
      return [selectedStr, numberingSystem, calendar];
    }
  }

  function intlConfigString(localeStr, numberingSystem, outputCalendar) {
    if (outputCalendar || numberingSystem) {
      if (!localeStr.includes("-u-")) {
        localeStr += "-u";
      }

      if (outputCalendar) {
        localeStr += `-ca-${outputCalendar}`;
      }

      if (numberingSystem) {
        localeStr += `-nu-${numberingSystem}`;
      }
      return localeStr;
    } else {
      return localeStr;
    }
  }

  function mapMonths(f) {
    const ms = [];
    for (let i = 1; i <= 12; i++) {
      const dt = DateTime.utc(2009, i, 1);
      ms.push(f(dt));
    }
    return ms;
  }

  function mapWeekdays(f) {
    const ms = [];
    for (let i = 1; i <= 7; i++) {
      const dt = DateTime.utc(2016, 11, 13 + i);
      ms.push(f(dt));
    }
    return ms;
  }

  function listStuff(loc, length, englishFn, intlFn) {
    const mode = loc.listingMode();

    if (mode === "error") {
      return null;
    } else if (mode === "en") {
      return englishFn(length);
    } else {
      return intlFn(length);
    }
  }

  function supportsFastNumbers(loc) {
    if (loc.numberingSystem && loc.numberingSystem !== "latn") {
      return false;
    } else {
      return (
        loc.numberingSystem === "latn" ||
        !loc.locale ||
        loc.locale.startsWith("en") ||
        getCachedIntResolvedOptions(loc.locale).numberingSystem === "latn"
      );
    }
  }

  /**
   * @private
   */

  class PolyNumberFormatter {
    constructor(intl, forceSimple, opts) {
      this.padTo = opts.padTo || 0;
      this.floor = opts.floor || false;

      const { padTo, floor, ...otherOpts } = opts;

      if (!forceSimple || Object.keys(otherOpts).length > 0) {
        const intlOpts = { useGrouping: false, ...opts };
        if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
        this.inf = getCachedINF(intl, intlOpts);
      }
    }

    format(i) {
      if (this.inf) {
        const fixed = this.floor ? Math.floor(i) : i;
        return this.inf.format(fixed);
      } else {
        // to match the browser's numberformatter defaults
        const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
        return padStart(fixed, this.padTo);
      }
    }
  }

  /**
   * @private
   */

  class PolyDateFormatter {
    constructor(dt, intl, opts) {
      this.opts = opts;
      this.originalZone = undefined;

      let z = undefined;
      if (this.opts.timeZone) {
        // Don't apply any workarounds if a timeZone is explicitly provided in opts
        this.dt = dt;
      } else if (dt.zone.type === "fixed") {
        // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
        // That is why fixed-offset TZ is set to that unless it is:
        // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
        // 2. Unsupported by the browser:
        //    - some do not support Etc/
        //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
        const gmtOffset = -1 * (dt.offset / 60);
        const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
        if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
          z = offsetZ;
          this.dt = dt;
        } else {
          // Not all fixed-offset zones like Etc/+4:30 are present in tzdata so
          // we manually apply the offset and substitute the zone as needed.
          z = "UTC";
          this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({ minutes: dt.offset });
          this.originalZone = dt.zone;
        }
      } else if (dt.zone.type === "system") {
        this.dt = dt;
      } else if (dt.zone.type === "iana") {
        this.dt = dt;
        z = dt.zone.name;
      } else {
        // Custom zones can have any offset / offsetName so we just manually
        // apply the offset and substitute the zone as needed.
        z = "UTC";
        this.dt = dt.setZone("UTC").plus({ minutes: dt.offset });
        this.originalZone = dt.zone;
      }

      const intlOpts = { ...this.opts };
      intlOpts.timeZone = intlOpts.timeZone || z;
      this.dtf = getCachedDTF(intl, intlOpts);
    }

    format() {
      if (this.originalZone) {
        // If we have to substitute in the actual zone name, we have to use
        // formatToParts so that the timezone can be replaced.
        return this.formatToParts()
          .map(({ value }) => value)
          .join("");
      }
      return this.dtf.format(this.dt.toJSDate());
    }

    formatToParts() {
      const parts = this.dtf.formatToParts(this.dt.toJSDate());
      if (this.originalZone) {
        return parts.map((part) => {
          if (part.type === "timeZoneName") {
            const offsetName = this.originalZone.offsetName(this.dt.ts, {
              locale: this.dt.locale,
              format: this.opts.timeZoneName,
            });
            return {
              ...part,
              value: offsetName,
            };
          } else {
            return part;
          }
        });
      }
      return parts;
    }

    resolvedOptions() {
      return this.dtf.resolvedOptions();
    }
  }

  /**
   * @private
   */
  class PolyRelFormatter {
    constructor(intl, isEnglish, opts) {
      this.opts = { style: "long", ...opts };
      if (!isEnglish && hasRelative()) {
        this.rtf = getCachedRTF(intl, opts);
      }
    }

    format(count, unit) {
      if (this.rtf) {
        return this.rtf.format(count, unit);
      } else {
        return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
      }
    }

    formatToParts(count, unit) {
      if (this.rtf) {
        return this.rtf.formatToParts(count, unit);
      } else {
        return [];
      }
    }
  }

  const fallbackWeekSettings = {
    firstDay: 1,
    minimalDays: 4,
    weekend: [6, 7],
  };

  /**
   * @private
   */
  class Locale {
    static fromOpts(opts) {
      return Locale.create(
        opts.locale,
        opts.numberingSystem,
        opts.outputCalendar,
        opts.weekSettings,
        opts.defaultToEN
      );
    }

    static create(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
      const specifiedLocale = locale || Settings.defaultLocale;
      // the system locale is useful for human-readable strings but annoying for parsing/formatting known formats
      const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
      const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
      const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
      const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
      return new Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
    }

    static resetCache() {
      sysLocaleCache = null;
      intlDTCache.clear();
      intlNumCache.clear();
      intlRelCache.clear();
      intlResolvedOptionsCache.clear();
      weekInfoCache.clear();
    }

    static fromObject({ locale, numberingSystem, outputCalendar, weekSettings } = {}) {
      return Locale.create(locale, numberingSystem, outputCalendar, weekSettings);
    }

    constructor(locale, numbering, outputCalendar, weekSettings, specifiedLocale) {
      const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);

      this.locale = parsedLocale;
      this.numberingSystem = numbering || parsedNumberingSystem || null;
      this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
      this.weekSettings = weekSettings;
      this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

      this.weekdaysCache = { format: {}, standalone: {} };
      this.monthsCache = { format: {}, standalone: {} };
      this.meridiemCache = null;
      this.eraCache = {};

      this.specifiedLocale = specifiedLocale;
      this.fastNumbersCached = null;
    }

    get fastNumbers() {
      if (this.fastNumbersCached == null) {
        this.fastNumbersCached = supportsFastNumbers(this);
      }

      return this.fastNumbersCached;
    }

    listingMode() {
      const isActuallyEn = this.isEnglish();
      const hasNoWeirdness =
        (this.numberingSystem === null || this.numberingSystem === "latn") &&
        (this.outputCalendar === null || this.outputCalendar === "gregory");
      return isActuallyEn && hasNoWeirdness ? "en" : "intl";
    }

    clone(alts) {
      if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
        return this;
      } else {
        return Locale.create(
          alts.locale || this.specifiedLocale,
          alts.numberingSystem || this.numberingSystem,
          alts.outputCalendar || this.outputCalendar,
          validateWeekSettings(alts.weekSettings) || this.weekSettings,
          alts.defaultToEN || false
        );
      }
    }

    redefaultToEN(alts = {}) {
      return this.clone({ ...alts, defaultToEN: true });
    }

    redefaultToSystem(alts = {}) {
      return this.clone({ ...alts, defaultToEN: false });
    }

    months(length, format = false) {
      return listStuff(this, length, months, () => {
        const intl = format ? { month: length, day: "numeric" } : { month: length },
          formatStr = format ? "format" : "standalone";
        if (!this.monthsCache[formatStr][length]) {
          this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
        }
        return this.monthsCache[formatStr][length];
      });
    }

    weekdays(length, format = false) {
      return listStuff(this, length, weekdays, () => {
        const intl = format
            ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
            : { weekday: length },
          formatStr = format ? "format" : "standalone";
        if (!this.weekdaysCache[formatStr][length]) {
          this.weekdaysCache[formatStr][length] = mapWeekdays((dt) =>
            this.extract(dt, intl, "weekday")
          );
        }
        return this.weekdaysCache[formatStr][length];
      });
    }

    meridiems() {
      return listStuff(
        this,
        undefined,
        () => meridiems,
        () => {
          // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
          // for AM and PM. This is probably wrong, but it's makes parsing way easier.
          if (!this.meridiemCache) {
            const intl = { hour: "numeric", hourCycle: "h12" };
            this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
              (dt) => this.extract(dt, intl, "dayperiod")
            );
          }

          return this.meridiemCache;
        }
      );
    }

    eras(length) {
      return listStuff(this, length, eras, () => {
        const intl = { era: length };

        // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
        // to definitely enumerate them.
        if (!this.eraCache[length]) {
          this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) =>
            this.extract(dt, intl, "era")
          );
        }

        return this.eraCache[length];
      });
    }

    extract(dt, intlOpts, field) {
      const df = this.dtFormatter(dt, intlOpts),
        results = df.formatToParts(),
        matching = results.find((m) => m.type.toLowerCase() === field);
      return matching ? matching.value : null;
    }

    numberFormatter(opts = {}) {
      // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
      // (in contrast, the rest of the condition is used heavily)
      return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
    }

    dtFormatter(dt, intlOpts = {}) {
      return new PolyDateFormatter(dt, this.intl, intlOpts);
    }

    relFormatter(opts = {}) {
      return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
    }

    listFormatter(opts = {}) {
      return getCachedLF(this.intl, opts);
    }

    isEnglish() {
      return (
        this.locale === "en" ||
        this.locale.toLowerCase() === "en-us" ||
        getCachedIntResolvedOptions(this.intl).locale.startsWith("en-us")
      );
    }

    getWeekSettings() {
      if (this.weekSettings) {
        return this.weekSettings;
      } else if (!hasLocaleWeekInfo()) {
        return fallbackWeekSettings;
      } else {
        return getCachedWeekInfo(this.locale);
      }
    }

    getStartOfWeek() {
      return this.getWeekSettings().firstDay;
    }

    getMinDaysInFirstWeek() {
      return this.getWeekSettings().minimalDays;
    }

    getWeekendDays() {
      return this.getWeekSettings().weekend;
    }

    equals(other) {
      return (
        this.locale === other.locale &&
        this.numberingSystem === other.numberingSystem &&
        this.outputCalendar === other.outputCalendar
      );
    }

    toString() {
      return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
    }
  }

  let singleton = null;

  /**
   * A zone with a fixed offset (meaning no DST)
   * @implements {Zone}
   */
  class FixedOffsetZone extends Zone {
    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    static get utcInstance() {
      if (singleton === null) {
        singleton = new FixedOffsetZone(0);
      }
      return singleton;
    }

    /**
     * Get an instance with a specified offset
     * @param {number} offset - The offset in minutes
     * @return {FixedOffsetZone}
     */
    static instance(offset) {
      return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
    }

    /**
     * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
     * @param {string} s - The offset string to parse
     * @example FixedOffsetZone.parseSpecifier("UTC+6")
     * @example FixedOffsetZone.parseSpecifier("UTC+06")
     * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
     * @return {FixedOffsetZone}
     */
    static parseSpecifier(s) {
      if (s) {
        const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
        if (r) {
          return new FixedOffsetZone(signedOffset(r[1], r[2]));
        }
      }
      return null;
    }

    constructor(offset) {
      super();
      /** @private **/
      this.fixed = offset;
    }

    /**
     * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
     * @override
     * @type {string}
     */
    get type() {
      return "fixed";
    }

    /**
     * The name of this zone.
     * All fixed zones' names always start with "UTC" (plus optional offset)
     * @override
     * @type {string}
     */
    get name() {
      return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
    }

    /**
     * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
     *
     * @override
     * @type {string}
     */
    get ianaName() {
      if (this.fixed === 0) {
        return "Etc/UTC";
      } else {
        return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
      }
    }

    /**
     * Returns the offset's common name at the specified timestamp.
     *
     * For fixed offset zones this equals to the zone name.
     * @override
     */
    offsetName() {
      return this.name;
    }

    /**
     * Returns the offset's value as a string
     * @override
     * @param {number} ts - Epoch milliseconds for which to get the offset
     * @param {string} format - What style of offset to return.
     *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
     * @return {string}
     */
    formatOffset(ts, format) {
      return formatOffset(this.fixed, format);
    }

    /**
     * Returns whether the offset is known to be fixed for the whole year:
     * Always returns true for all fixed offset zones.
     * @override
     * @type {boolean}
     */
    get isUniversal() {
      return true;
    }

    /**
     * Return the offset in minutes for this zone at the specified timestamp.
     *
     * For fixed offset zones, this is constant and does not depend on a timestamp.
     * @override
     * @return {number}
     */
    offset() {
      return this.fixed;
    }

    /**
     * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
     * @override
     * @param {Zone} otherZone - the zone to compare
     * @return {boolean}
     */
    equals(otherZone) {
      return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
    }

    /**
     * Return whether this Zone is valid:
     * All fixed offset zones are valid.
     * @override
     * @type {boolean}
     */
    get isValid() {
      return true;
    }
  }

  /**
   * A zone that failed to parse. You should never need to instantiate this.
   * @implements {Zone}
   */
  class InvalidZone extends Zone {
    constructor(zoneName) {
      super();
      /**  @private */
      this.zoneName = zoneName;
    }

    /** @override **/
    get type() {
      return "invalid";
    }

    /** @override **/
    get name() {
      return this.zoneName;
    }

    /** @override **/
    get isUniversal() {
      return false;
    }

    /** @override **/
    offsetName() {
      return null;
    }

    /** @override **/
    formatOffset() {
      return "";
    }

    /** @override **/
    offset() {
      return NaN;
    }

    /** @override **/
    equals() {
      return false;
    }

    /** @override **/
    get isValid() {
      return false;
    }
  }

  /**
   * @private
   */


  function normalizeZone(input, defaultZone) {
    if (isUndefined(input) || input === null) {
      return defaultZone;
    } else if (input instanceof Zone) {
      return input;
    } else if (isString(input)) {
      const lowered = input.toLowerCase();
      if (lowered === "default") return defaultZone;
      else if (lowered === "local" || lowered === "system") return SystemZone.instance;
      else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
      else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
    } else if (isNumber$1(input)) {
      return FixedOffsetZone.instance(input);
    } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
      // This is dumb, but the instanceof check above doesn't seem to really work
      // so we're duck checking it
      return input;
    } else {
      return new InvalidZone(input);
    }
  }

  const numberingSystems = {
    arab: "[\u0660-\u0669]",
    arabext: "[\u06F0-\u06F9]",
    bali: "[\u1B50-\u1B59]",
    beng: "[\u09E6-\u09EF]",
    deva: "[\u0966-\u096F]",
    fullwide: "[\uFF10-\uFF19]",
    gujr: "[\u0AE6-\u0AEF]",
    hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
    khmr: "[\u17E0-\u17E9]",
    knda: "[\u0CE6-\u0CEF]",
    laoo: "[\u0ED0-\u0ED9]",
    limb: "[\u1946-\u194F]",
    mlym: "[\u0D66-\u0D6F]",
    mong: "[\u1810-\u1819]",
    mymr: "[\u1040-\u1049]",
    orya: "[\u0B66-\u0B6F]",
    tamldec: "[\u0BE6-\u0BEF]",
    telu: "[\u0C66-\u0C6F]",
    thai: "[\u0E50-\u0E59]",
    tibt: "[\u0F20-\u0F29]",
    latn: "\\d",
  };

  const numberingSystemsUTF16 = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881],
  };

  const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");

  function parseDigits(str) {
    let value = parseInt(str, 10);
    if (isNaN(value)) {
      value = "";
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);

        if (str[i].search(numberingSystems.hanidec) !== -1) {
          value += hanidecChars.indexOf(str[i]);
        } else {
          for (const key in numberingSystemsUTF16) {
            const [min, max] = numberingSystemsUTF16[key];
            if (code >= min && code <= max) {
              value += code - min;
            }
          }
        }
      }
      return parseInt(value, 10);
    } else {
      return value;
    }
  }

  // cache of {numberingSystem: {append: regex}}
  const digitRegexCache = new Map();
  function resetDigitRegexCache() {
    digitRegexCache.clear();
  }

  function digitRegex({ numberingSystem }, append = "") {
    const ns = numberingSystem || "latn";

    let appendCache = digitRegexCache.get(ns);
    if (appendCache === undefined) {
      appendCache = new Map();
      digitRegexCache.set(ns, appendCache);
    }
    let regex = appendCache.get(append);
    if (regex === undefined) {
      regex = new RegExp(`${numberingSystems[ns]}${append}`);
      appendCache.set(append, regex);
    }

    return regex;
  }

  let now = () => Date.now(),
    defaultZone = "system",
    defaultLocale = null,
    defaultNumberingSystem = null,
    defaultOutputCalendar = null,
    twoDigitCutoffYear = 60,
    throwOnInvalid,
    defaultWeekSettings = null;

  /**
   * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
   */
  class Settings {
    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    static get now() {
      return now;
    }

    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    static set now(n) {
      now = n;
    }

    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * Use the value "system" to reset this value to the system's time zone.
     * @type {string}
     */
    static set defaultZone(zone) {
      defaultZone = zone;
    }

    /**
     * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
     * The default value is the system's time zone (the one set on the machine that runs this code).
     * @type {Zone}
     */
    static get defaultZone() {
      return normalizeZone(defaultZone, SystemZone.instance);
    }

    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultLocale() {
      return defaultLocale;
    }

    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultLocale(locale) {
      defaultLocale = locale;
    }

    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultNumberingSystem() {
      return defaultNumberingSystem;
    }

    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultNumberingSystem(numberingSystem) {
      defaultNumberingSystem = numberingSystem;
    }

    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static get defaultOutputCalendar() {
      return defaultOutputCalendar;
    }

    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    static set defaultOutputCalendar(outputCalendar) {
      defaultOutputCalendar = outputCalendar;
    }

    /**
     * @typedef {Object} WeekSettings
     * @property {number} firstDay
     * @property {number} minimalDays
     * @property {number[]} weekend
     */

    /**
     * @return {WeekSettings|null}
     */
    static get defaultWeekSettings() {
      return defaultWeekSettings;
    }

    /**
     * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
     * how many days are required in the first week of a year.
     * Does not affect existing instances.
     *
     * @param {WeekSettings|null} weekSettings
     */
    static set defaultWeekSettings(weekSettings) {
      defaultWeekSettings = validateWeekSettings(weekSettings);
    }

    /**
     * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
     * @type {number}
     */
    static get twoDigitCutoffYear() {
      return twoDigitCutoffYear;
    }

    /**
     * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
     * @type {number}
     * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
     * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
     * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
     * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
     * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
     */
    static set twoDigitCutoffYear(cutoffYear) {
      twoDigitCutoffYear = cutoffYear % 100;
    }

    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static get throwOnInvalid() {
      return throwOnInvalid;
    }

    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    static set throwOnInvalid(t) {
      throwOnInvalid = t;
    }

    /**
     * Reset Luxon's global caches. Should only be necessary in testing scenarios.
     * @return {void}
     */
    static resetCaches() {
      Locale.resetCache();
      IANAZone.resetCache();
      DateTime.resetCache();
      resetDigitRegexCache();
    }
  }

  class Invalid {
    constructor(reason, explanation) {
      this.reason = reason;
      this.explanation = explanation;
    }

    toMessage() {
      if (this.explanation) {
        return `${this.reason}: ${this.explanation}`;
      } else {
        return this.reason;
      }
    }
  }

  const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

  function unitOutOfRange(unit, value) {
    return new Invalid(
      "unit out of range",
      `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
    );
  }

  function dayOfWeek(year, month, day) {
    const d = new Date(Date.UTC(year, month - 1, day));

    if (year < 100 && year >= 0) {
      d.setUTCFullYear(d.getUTCFullYear() - 1900);
    }

    const js = d.getUTCDay();

    return js === 0 ? 7 : js;
  }

  function computeOrdinal(year, month, day) {
    return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
  }

  function uncomputeOrdinal(year, ordinal) {
    const table = isLeapYear(year) ? leapLadder : nonLeapLadder,
      month0 = table.findIndex((i) => i < ordinal),
      day = ordinal - table[month0];
    return { month: month0 + 1, day };
  }

  function isoWeekdayToLocal(isoWeekday, startOfWeek) {
    return ((isoWeekday - startOfWeek + 7) % 7) + 1;
  }

  /**
   * @private
   */

  function gregorianToWeek(gregObj, minDaysInFirstWeek = 4, startOfWeek = 1) {
    const { year, month, day } = gregObj,
      ordinal = computeOrdinal(year, month, day),
      weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);

    let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7),
      weekYear;

    if (weekNumber < 1) {
      weekYear = year - 1;
      weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
    } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
      weekYear = year + 1;
      weekNumber = 1;
    } else {
      weekYear = year;
    }

    return { weekYear, weekNumber, weekday, ...timeObject(gregObj) };
  }

  function weekToGregorian(weekData, minDaysInFirstWeek = 4, startOfWeek = 1) {
    const { weekYear, weekNumber, weekday } = weekData,
      weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek),
      yearInDays = daysInYear(weekYear);

    let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek,
      year;

    if (ordinal < 1) {
      year = weekYear - 1;
      ordinal += daysInYear(year);
    } else if (ordinal > yearInDays) {
      year = weekYear + 1;
      ordinal -= daysInYear(weekYear);
    } else {
      year = weekYear;
    }

    const { month, day } = uncomputeOrdinal(year, ordinal);
    return { year, month, day, ...timeObject(weekData) };
  }

  function gregorianToOrdinal(gregData) {
    const { year, month, day } = gregData;
    const ordinal = computeOrdinal(year, month, day);
    return { year, ordinal, ...timeObject(gregData) };
  }

  function ordinalToGregorian(ordinalData) {
    const { year, ordinal } = ordinalData;
    const { month, day } = uncomputeOrdinal(year, ordinal);
    return { year, month, day, ...timeObject(ordinalData) };
  }

  /**
   * Check if local week units like localWeekday are used in obj.
   * If so, validates that they are not mixed with ISO week units and then copies them to the normal week unit properties.
   * Modifies obj in-place!
   * @param obj the object values
   */
  function usesLocalWeekValues(obj, loc) {
    const hasLocaleWeekData =
      !isUndefined(obj.localWeekday) ||
      !isUndefined(obj.localWeekNumber) ||
      !isUndefined(obj.localWeekYear);
    if (hasLocaleWeekData) {
      const hasIsoWeekData =
        !isUndefined(obj.weekday) || !isUndefined(obj.weekNumber) || !isUndefined(obj.weekYear);

      if (hasIsoWeekData) {
        throw new ConflictingSpecificationError(
          "Cannot mix locale-based week fields with ISO-based week fields"
        );
      }
      if (!isUndefined(obj.localWeekday)) obj.weekday = obj.localWeekday;
      if (!isUndefined(obj.localWeekNumber)) obj.weekNumber = obj.localWeekNumber;
      if (!isUndefined(obj.localWeekYear)) obj.weekYear = obj.localWeekYear;
      delete obj.localWeekday;
      delete obj.localWeekNumber;
      delete obj.localWeekYear;
      return {
        minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
        startOfWeek: loc.getStartOfWeek(),
      };
    } else {
      return { minDaysInFirstWeek: 4, startOfWeek: 1 };
    }
  }

  function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
    const validYear = isInteger(obj.weekYear),
      validWeek = integerBetween(
        obj.weekNumber,
        1,
        weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)
      ),
      validWeekday = integerBetween(obj.weekday, 1, 7);

    if (!validYear) {
      return unitOutOfRange("weekYear", obj.weekYear);
    } else if (!validWeek) {
      return unitOutOfRange("week", obj.weekNumber);
    } else if (!validWeekday) {
      return unitOutOfRange("weekday", obj.weekday);
    } else return false;
  }

  function hasInvalidOrdinalData(obj) {
    const validYear = isInteger(obj.year),
      validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

    if (!validYear) {
      return unitOutOfRange("year", obj.year);
    } else if (!validOrdinal) {
      return unitOutOfRange("ordinal", obj.ordinal);
    } else return false;
  }

  function hasInvalidGregorianData(obj) {
    const validYear = isInteger(obj.year),
      validMonth = integerBetween(obj.month, 1, 12),
      validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

    if (!validYear) {
      return unitOutOfRange("year", obj.year);
    } else if (!validMonth) {
      return unitOutOfRange("month", obj.month);
    } else if (!validDay) {
      return unitOutOfRange("day", obj.day);
    } else return false;
  }

  function hasInvalidTimeData(obj) {
    const { hour, minute, second, millisecond } = obj;
    const validHour =
        integerBetween(hour, 0, 23) ||
        (hour === 24 && minute === 0 && second === 0 && millisecond === 0),
      validMinute = integerBetween(minute, 0, 59),
      validSecond = integerBetween(second, 0, 59),
      validMillisecond = integerBetween(millisecond, 0, 999);

    if (!validHour) {
      return unitOutOfRange("hour", hour);
    } else if (!validMinute) {
      return unitOutOfRange("minute", minute);
    } else if (!validSecond) {
      return unitOutOfRange("second", second);
    } else if (!validMillisecond) {
      return unitOutOfRange("millisecond", millisecond);
    } else return false;
  }

  /*
    This is just a junk drawer, containing anything used across multiple classes.
    Because Luxon is small(ish), this should stay small and we won't worry about splitting
    it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
  */


  /**
   * @private
   */

  // TYPES

  function isUndefined(o) {
    return typeof o === "undefined";
  }

  function isNumber$1(o) {
    return typeof o === "number";
  }

  function isInteger(o) {
    return typeof o === "number" && o % 1 === 0;
  }

  function isString(o) {
    return typeof o === "string";
  }

  function isDate(o) {
    return Object.prototype.toString.call(o) === "[object Date]";
  }

  // CAPABILITIES

  function hasRelative() {
    try {
      return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
    } catch (e) {
      return false;
    }
  }

  function hasLocaleWeekInfo() {
    try {
      return (
        typeof Intl !== "undefined" &&
        !!Intl.Locale &&
        ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype)
      );
    } catch (e) {
      return false;
    }
  }

  // OBJECTS AND ARRAYS

  function maybeArray(thing) {
    return Array.isArray(thing) ? thing : [thing];
  }

  function bestBy(arr, by, compare) {
    if (arr.length === 0) {
      return undefined;
    }
    return arr.reduce((best, next) => {
      const pair = [by(next), next];
      if (!best) {
        return pair;
      } else if (compare(best[0], pair[0]) === best[0]) {
        return best;
      } else {
        return pair;
      }
    }, null)[1];
  }

  function pick(obj, keys) {
    return keys.reduce((a, k) => {
      a[k] = obj[k];
      return a;
    }, {});
  }

  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function validateWeekSettings(settings) {
    if (settings == null) {
      return null;
    } else if (typeof settings !== "object") {
      throw new InvalidArgumentError("Week settings must be an object");
    } else {
      if (
        !integerBetween(settings.firstDay, 1, 7) ||
        !integerBetween(settings.minimalDays, 1, 7) ||
        !Array.isArray(settings.weekend) ||
        settings.weekend.some((v) => !integerBetween(v, 1, 7))
      ) {
        throw new InvalidArgumentError("Invalid week settings");
      }
      return {
        firstDay: settings.firstDay,
        minimalDays: settings.minimalDays,
        weekend: Array.from(settings.weekend),
      };
    }
  }

  // NUMBERS AND STRINGS

  function integerBetween(thing, bottom, top) {
    return isInteger(thing) && thing >= bottom && thing <= top;
  }

  // x % n but takes the sign of n instead of x
  function floorMod(x, n) {
    return x - n * Math.floor(x / n);
  }

  function padStart(input, n = 2) {
    const isNeg = input < 0;
    let padded;
    if (isNeg) {
      padded = "-" + ("" + -input).padStart(n, "0");
    } else {
      padded = ("" + input).padStart(n, "0");
    }
    return padded;
  }

  function parseInteger(string) {
    if (isUndefined(string) || string === null || string === "") {
      return undefined;
    } else {
      return parseInt(string, 10);
    }
  }

  function parseFloating(string) {
    if (isUndefined(string) || string === null || string === "") {
      return undefined;
    } else {
      return parseFloat(string);
    }
  }

  function parseMillis(fraction) {
    // Return undefined (instead of 0) in these cases, where fraction is not set
    if (isUndefined(fraction) || fraction === null || fraction === "") {
      return undefined;
    } else {
      const f = parseFloat("0." + fraction) * 1000;
      return Math.floor(f);
    }
  }

  function roundTo(number, digits, towardZero = false) {
    const factor = 10 ** digits,
      rounder = towardZero ? Math.trunc : Math.round;
    return rounder(number * factor) / factor;
  }

  // DATE BASICS

  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  function daysInMonth(year, month) {
    const modMonth = floorMod(month - 1, 12) + 1,
      modYear = year + (month - modMonth) / 12;

    if (modMonth === 2) {
      return isLeapYear(modYear) ? 29 : 28;
    } else {
      return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
    }
  }

  // convert a calendar object to a local timestamp (epoch, but with the offset baked in)
  function objToLocalTS(obj) {
    let d = Date.UTC(
      obj.year,
      obj.month - 1,
      obj.day,
      obj.hour,
      obj.minute,
      obj.second,
      obj.millisecond
    );

    // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
    if (obj.year < 100 && obj.year >= 0) {
      d = new Date(d);
      // set the month and day again, this is necessary because year 2000 is a leap year, but year 100 is not
      // so if obj.year is in 99, but obj.day makes it roll over into year 100,
      // the calculations done by Date.UTC are using year 2000 - which is incorrect
      d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
    }
    return +d;
  }

  // adapted from moment.js: https://github.com/moment/moment/blob/000ac1800e620f770f4eb31b5ae908f6167b0ab2/src/lib/units/week-calendar-utils.js
  function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
    const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
    return -fwdlw + minDaysInFirstWeek - 1;
  }

  function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
    const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
    const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
    return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
  }

  function untruncateYear(year) {
    if (year > 99) {
      return year;
    } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2000 + year;
  }

  // PARSING

  function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
    const date = new Date(ts),
      intlOpts = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };

    if (timeZone) {
      intlOpts.timeZone = timeZone;
    }

    const modified = { timeZoneName: offsetFormat, ...intlOpts };

    const parsed = new Intl.DateTimeFormat(locale, modified)
      .formatToParts(date)
      .find((m) => m.type.toLowerCase() === "timezonename");
    return parsed ? parsed.value : null;
  }

  // signedOffset('-5', '30') -> -330
  function signedOffset(offHourStr, offMinuteStr) {
    let offHour = parseInt(offHourStr, 10);

    // don't || this because we want to preserve -0
    if (Number.isNaN(offHour)) {
      offHour = 0;
    }

    const offMin = parseInt(offMinuteStr, 10) || 0,
      offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
    return offHour * 60 + offMinSigned;
  }

  // COERCION

  function asNumber(value) {
    const numericValue = Number(value);
    if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
      throw new InvalidArgumentError(`Invalid unit value ${value}`);
    return numericValue;
  }

  function normalizeObject(obj, normalizer) {
    const normalized = {};
    for (const u in obj) {
      if (hasOwnProperty(obj, u)) {
        const v = obj[u];
        if (v === undefined || v === null) continue;
        normalized[normalizer(u)] = asNumber(v);
      }
    }
    return normalized;
  }

  /**
   * Returns the offset's value as a string
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  function formatOffset(offset, format) {
    const hours = Math.trunc(Math.abs(offset / 60)),
      minutes = Math.trunc(Math.abs(offset % 60)),
      sign = offset >= 0 ? "+" : "-";

    switch (format) {
      case "short":
        return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
      case "narrow":
        return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
      case "techie":
        return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
      default:
        throw new RangeError(`Value format ${format} is out of range for property format`);
    }
  }

  function timeObject(obj) {
    return pick(obj, ["hour", "minute", "second", "millisecond"]);
  }

  /**
   * @private
   */

  const monthsLong = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  function months(length) {
    switch (length) {
      case "narrow":
        return [...monthsNarrow];
      case "short":
        return [...monthsShort];
      case "long":
        return [...monthsLong];
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      case "2-digit":
        return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      default:
        return null;
    }
  }

  const weekdaysLong = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];

  function weekdays(length) {
    switch (length) {
      case "narrow":
        return [...weekdaysNarrow];
      case "short":
        return [...weekdaysShort];
      case "long":
        return [...weekdaysLong];
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7"];
      default:
        return null;
    }
  }

  const meridiems = ["AM", "PM"];

  const erasLong = ["Before Christ", "Anno Domini"];

  const erasShort = ["BC", "AD"];

  const erasNarrow = ["B", "A"];

  function eras(length) {
    switch (length) {
      case "narrow":
        return [...erasNarrow];
      case "short":
        return [...erasShort];
      case "long":
        return [...erasLong];
      default:
        return null;
    }
  }

  function meridiemForDateTime(dt) {
    return meridiems[dt.hour < 12 ? 0 : 1];
  }

  function weekdayForDateTime(dt, length) {
    return weekdays(length)[dt.weekday - 1];
  }

  function monthForDateTime(dt, length) {
    return months(length)[dt.month - 1];
  }

  function eraForDateTime(dt, length) {
    return eras(length)[dt.year < 0 ? 0 : 1];
  }

  function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
    const units = {
      years: ["year", "yr."],
      quarters: ["quarter", "qtr."],
      months: ["month", "mo."],
      weeks: ["week", "wk."],
      days: ["day", "day", "days"],
      hours: ["hour", "hr."],
      minutes: ["minute", "min."],
      seconds: ["second", "sec."],
    };

    const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

    if (numeric === "auto" && lastable) {
      const isDay = unit === "days";
      switch (count) {
        case 1:
          return isDay ? "tomorrow" : `next ${units[unit][0]}`;
        case -1:
          return isDay ? "yesterday" : `last ${units[unit][0]}`;
        case 0:
          return isDay ? "today" : `this ${units[unit][0]}`;
      }
    }

    const isInPast = Object.is(count, -0) || count < 0,
      fmtValue = Math.abs(count),
      singular = fmtValue === 1,
      lilUnits = units[unit],
      fmtUnit = narrow
        ? singular
          ? lilUnits[1]
          : lilUnits[2] || lilUnits[1]
        : singular
        ? units[unit][0]
        : unit;
    return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
  }

  function stringifyTokens(splits, tokenToString) {
    let s = "";
    for (const token of splits) {
      if (token.literal) {
        s += token.val;
      } else {
        s += tokenToString(token.val);
      }
    }
    return s;
  }

  const macroTokenToFormatOpts = {
    D: DATE_SHORT,
    DD: DATE_MED,
    DDD: DATE_FULL,
    DDDD: DATE_HUGE,
    t: TIME_SIMPLE,
    tt: TIME_WITH_SECONDS,
    ttt: TIME_WITH_SHORT_OFFSET,
    tttt: TIME_WITH_LONG_OFFSET,
    T: TIME_24_SIMPLE,
    TT: TIME_24_WITH_SECONDS,
    TTT: TIME_24_WITH_SHORT_OFFSET,
    TTTT: TIME_24_WITH_LONG_OFFSET,
    f: DATETIME_SHORT,
    ff: DATETIME_MED,
    fff: DATETIME_FULL,
    ffff: DATETIME_HUGE,
    F: DATETIME_SHORT_WITH_SECONDS,
    FF: DATETIME_MED_WITH_SECONDS,
    FFF: DATETIME_FULL_WITH_SECONDS,
    FFFF: DATETIME_HUGE_WITH_SECONDS,
  };

  /**
   * @private
   */

  class Formatter {
    static create(locale, opts = {}) {
      return new Formatter(locale, opts);
    }

    static parseFormat(fmt) {
      // white-space is always considered a literal in user-provided formats
      // the " " token has a special meaning (see unitForToken)

      let current = null,
        currentFull = "",
        bracketed = false;
      const splits = [];
      for (let i = 0; i < fmt.length; i++) {
        const c = fmt.charAt(i);
        if (c === "'") {
          if (currentFull.length > 0) {
            splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
          }
          current = null;
          currentFull = "";
          bracketed = !bracketed;
        } else if (bracketed) {
          currentFull += c;
        } else if (c === current) {
          currentFull += c;
        } else {
          if (currentFull.length > 0) {
            splits.push({ literal: /^\s+$/.test(currentFull), val: currentFull });
          }
          currentFull = c;
          current = c;
        }
      }

      if (currentFull.length > 0) {
        splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
      }

      return splits;
    }

    static macroTokenToFormatOpts(token) {
      return macroTokenToFormatOpts[token];
    }

    constructor(locale, formatOpts) {
      this.opts = formatOpts;
      this.loc = locale;
      this.systemLoc = null;
    }

    formatWithSystemDefault(dt, opts) {
      if (this.systemLoc === null) {
        this.systemLoc = this.loc.redefaultToSystem();
      }
      const df = this.systemLoc.dtFormatter(dt, { ...this.opts, ...opts });
      return df.format();
    }

    dtFormatter(dt, opts = {}) {
      return this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    }

    formatDateTime(dt, opts) {
      return this.dtFormatter(dt, opts).format();
    }

    formatDateTimeParts(dt, opts) {
      return this.dtFormatter(dt, opts).formatToParts();
    }

    formatInterval(interval, opts) {
      const df = this.dtFormatter(interval.start, opts);
      return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
    }

    resolvedOptions(dt, opts) {
      return this.dtFormatter(dt, opts).resolvedOptions();
    }

    num(n, p = 0) {
      // we get some perf out of doing this here, annoyingly
      if (this.opts.forceSimple) {
        return padStart(n, p);
      }

      const opts = { ...this.opts };

      if (p > 0) {
        opts.padTo = p;
      }

      return this.loc.numberFormatter(opts).format(n);
    }

    formatDateTimeFromString(dt, fmt) {
      const knownEnglish = this.loc.listingMode() === "en",
        useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
        string = (opts, extract) => this.loc.extract(dt, opts, extract),
        formatOffset = (opts) => {
          if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
            return "Z";
          }

          return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
        },
        meridiem = () =>
          knownEnglish
            ? meridiemForDateTime(dt)
            : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"),
        month = (length, standalone) =>
          knownEnglish
            ? monthForDateTime(dt, length)
            : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"),
        weekday = (length, standalone) =>
          knownEnglish
            ? weekdayForDateTime(dt, length)
            : string(
                standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
                "weekday"
              ),
        maybeMacro = (token) => {
          const formatOpts = Formatter.macroTokenToFormatOpts(token);
          if (formatOpts) {
            return this.formatWithSystemDefault(dt, formatOpts);
          } else {
            return token;
          }
        },
        era = (length) =>
          knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"),
        tokenToString = (token) => {
          // Where possible: https://cldr.unicode.org/translation/date-time/date-time-symbols
          switch (token) {
            // ms
            case "S":
              return this.num(dt.millisecond);
            case "u":
            // falls through
            case "SSS":
              return this.num(dt.millisecond, 3);
            // seconds
            case "s":
              return this.num(dt.second);
            case "ss":
              return this.num(dt.second, 2);
            // fractional seconds
            case "uu":
              return this.num(Math.floor(dt.millisecond / 10), 2);
            case "uuu":
              return this.num(Math.floor(dt.millisecond / 100));
            // minutes
            case "m":
              return this.num(dt.minute);
            case "mm":
              return this.num(dt.minute, 2);
            // hours
            case "h":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
            case "hh":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
            case "H":
              return this.num(dt.hour);
            case "HH":
              return this.num(dt.hour, 2);
            // offset
            case "Z":
              // like +6
              return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
            case "ZZ":
              // like +06:00
              return formatOffset({ format: "short", allowZ: this.opts.allowZ });
            case "ZZZ":
              // like +0600
              return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
            case "ZZZZ":
              // like EST
              return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
            case "ZZZZZ":
              // like Eastern Standard Time
              return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
            // zone
            case "z":
              // like America/New_York
              return dt.zoneName;
            // meridiems
            case "a":
              return meridiem();
            // dates
            case "d":
              return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
            case "dd":
              return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
            // weekdays - standalone
            case "c":
              // like 1
              return this.num(dt.weekday);
            case "ccc":
              // like 'Tues'
              return weekday("short", true);
            case "cccc":
              // like 'Tuesday'
              return weekday("long", true);
            case "ccccc":
              // like 'T'
              return weekday("narrow", true);
            // weekdays - format
            case "E":
              // like 1
              return this.num(dt.weekday);
            case "EEE":
              // like 'Tues'
              return weekday("short", false);
            case "EEEE":
              // like 'Tuesday'
              return weekday("long", false);
            case "EEEEE":
              // like 'T'
              return weekday("narrow", false);
            // months - standalone
            case "L":
              // like 1
              return useDateTimeFormatter
                ? string({ month: "numeric", day: "numeric" }, "month")
                : this.num(dt.month);
            case "LL":
              // like 01, doesn't seem to work
              return useDateTimeFormatter
                ? string({ month: "2-digit", day: "numeric" }, "month")
                : this.num(dt.month, 2);
            case "LLL":
              // like Jan
              return month("short", true);
            case "LLLL":
              // like January
              return month("long", true);
            case "LLLLL":
              // like J
              return month("narrow", true);
            // months - format
            case "M":
              // like 1
              return useDateTimeFormatter
                ? string({ month: "numeric" }, "month")
                : this.num(dt.month);
            case "MM":
              // like 01
              return useDateTimeFormatter
                ? string({ month: "2-digit" }, "month")
                : this.num(dt.month, 2);
            case "MMM":
              // like Jan
              return month("short", false);
            case "MMMM":
              // like January
              return month("long", false);
            case "MMMMM":
              // like J
              return month("narrow", false);
            // years
            case "y":
              // like 2014
              return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
            case "yy":
              // like 14
              return useDateTimeFormatter
                ? string({ year: "2-digit" }, "year")
                : this.num(dt.year.toString().slice(-2), 2);
            case "yyyy":
              // like 0012
              return useDateTimeFormatter
                ? string({ year: "numeric" }, "year")
                : this.num(dt.year, 4);
            case "yyyyyy":
              // like 000012
              return useDateTimeFormatter
                ? string({ year: "numeric" }, "year")
                : this.num(dt.year, 6);
            // eras
            case "G":
              // like AD
              return era("short");
            case "GG":
              // like Anno Domini
              return era("long");
            case "GGGGG":
              return era("narrow");
            case "kk":
              return this.num(dt.weekYear.toString().slice(-2), 2);
            case "kkkk":
              return this.num(dt.weekYear, 4);
            case "W":
              return this.num(dt.weekNumber);
            case "WW":
              return this.num(dt.weekNumber, 2);
            case "n":
              return this.num(dt.localWeekNumber);
            case "nn":
              return this.num(dt.localWeekNumber, 2);
            case "ii":
              return this.num(dt.localWeekYear.toString().slice(-2), 2);
            case "iiii":
              return this.num(dt.localWeekYear, 4);
            case "o":
              return this.num(dt.ordinal);
            case "ooo":
              return this.num(dt.ordinal, 3);
            case "q":
              // like 1
              return this.num(dt.quarter);
            case "qq":
              // like 01
              return this.num(dt.quarter, 2);
            case "X":
              return this.num(Math.floor(dt.ts / 1000));
            case "x":
              return this.num(dt.ts);
            default:
              return maybeMacro(token);
          }
        };

      return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
    }

    formatDurationFromString(dur, fmt) {
      const tokenToField = (token) => {
          switch (token[0]) {
            case "S":
              return "millisecond";
            case "s":
              return "second";
            case "m":
              return "minute";
            case "h":
              return "hour";
            case "d":
              return "day";
            case "w":
              return "week";
            case "M":
              return "month";
            case "y":
              return "year";
            default:
              return null;
          }
        },
        tokenToString = (lildur) => (token) => {
          const mapped = tokenToField(token);
          if (mapped) {
            return this.num(lildur.get(mapped), token.length);
          } else {
            return token;
          }
        },
        tokens = Formatter.parseFormat(fmt),
        realTokens = tokens.reduce(
          (found, { literal, val }) => (literal ? found : found.concat(val)),
          []
        ),
        collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t));
      return stringifyTokens(tokens, tokenToString(collapsed));
    }
  }

  /*
   * This file handles parsing for well-specified formats. Here's how it works:
   * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
   * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
   * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
   * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
   * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
   * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
   */

  const ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;

  function combineRegexes(...regexes) {
    const full = regexes.reduce((f, r) => f + r.source, "");
    return RegExp(`^${full}$`);
  }

  function combineExtractors(...extractors) {
    return (m) =>
      extractors
        .reduce(
          ([mergedVals, mergedZone, cursor], ex) => {
            const [val, zone, next] = ex(m, cursor);
            return [{ ...mergedVals, ...val }, zone || mergedZone, next];
          },
          [{}, null, 1]
        )
        .slice(0, 2);
  }

  function parse$1(s, ...patterns) {
    if (s == null) {
      return [null, null];
    }

    for (const [regex, extractor] of patterns) {
      const m = regex.exec(s);
      if (m) {
        return extractor(m);
      }
    }
    return [null, null];
  }

  function simpleParse(...keys) {
    return (match, cursor) => {
      const ret = {};
      let i;

      for (i = 0; i < keys.length; i++) {
        ret[keys[i]] = parseInteger(match[cursor + i]);
      }
      return [ret, null, cursor + i];
    };
  }

  // ISO and SQL parsing
  const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
  const isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
  const isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
  const isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
  const isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
  const isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
  const isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
  const isoOrdinalRegex = /(\d{4})-?(\d{3})/;
  const extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
  const extractISOOrdinalData = simpleParse("year", "ordinal");
  const sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/; // dumbed-down version of the ISO one
  const sqlTimeRegex = RegExp(
    `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
  );
  const sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

  function int(match, pos, fallback) {
    const m = match[pos];
    return isUndefined(m) ? fallback : parseInteger(m);
  }

  function extractISOYmd(match, cursor) {
    const item = {
      year: int(match, cursor),
      month: int(match, cursor + 1, 1),
      day: int(match, cursor + 2, 1),
    };

    return [item, null, cursor + 3];
  }

  function extractISOTime(match, cursor) {
    const item = {
      hours: int(match, cursor, 0),
      minutes: int(match, cursor + 1, 0),
      seconds: int(match, cursor + 2, 0),
      milliseconds: parseMillis(match[cursor + 3]),
    };

    return [item, null, cursor + 4];
  }

  function extractISOOffset(match, cursor) {
    const local = !match[cursor] && !match[cursor + 1],
      fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
      zone = local ? null : FixedOffsetZone.instance(fullOffset);
    return [{}, zone, cursor + 3];
  }

  function extractIANAZone(match, cursor) {
    const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
    return [{}, zone, cursor + 1];
  }

  // ISO time parsing

  const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);

  // ISO duration parsing

  const isoDuration =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;

  function extractISODuration(match) {
    const [s, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] =
      match;

    const hasNegativePrefix = s[0] === "-";
    const negativeSeconds = secondStr && secondStr[0] === "-";

    const maybeNegate = (num, force = false) =>
      num !== undefined && (force || (num && hasNegativePrefix)) ? -num : num;

    return [
      {
        years: maybeNegate(parseFloating(yearStr)),
        months: maybeNegate(parseFloating(monthStr)),
        weeks: maybeNegate(parseFloating(weekStr)),
        days: maybeNegate(parseFloating(dayStr)),
        hours: maybeNegate(parseFloating(hourStr)),
        minutes: maybeNegate(parseFloating(minuteStr)),
        seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
        milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds),
      },
    ];
  }

  // These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
  // and not just that we're in -240 *right now*. But since I don't think these are used that often
  // I'm just going to ignore that
  const obsOffsets = {
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
  };

  function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    const result = {
      year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
      month: monthsShort.indexOf(monthStr) + 1,
      day: parseInteger(dayStr),
      hour: parseInteger(hourStr),
      minute: parseInteger(minuteStr),
    };

    if (secondStr) result.second = parseInteger(secondStr);
    if (weekdayStr) {
      result.weekday =
        weekdayStr.length > 3
          ? weekdaysLong.indexOf(weekdayStr) + 1
          : weekdaysShort.indexOf(weekdayStr) + 1;
    }

    return result;
  }

  // RFC 2822/5322
  const rfc2822 =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

  function extractRFC2822(match) {
    const [
        ,
        weekdayStr,
        dayStr,
        monthStr,
        yearStr,
        hourStr,
        minuteStr,
        secondStr,
        obsOffset,
        milOffset,
        offHourStr,
        offMinuteStr,
      ] = match,
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

    let offset;
    if (obsOffset) {
      offset = obsOffsets[obsOffset];
    } else if (milOffset) {
      offset = 0;
    } else {
      offset = signedOffset(offHourStr, offMinuteStr);
    }

    return [result, new FixedOffsetZone(offset)];
  }

  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s
      .replace(/\([^()]*\)|[\n\t]/g, " ")
      .replace(/(\s\s+)/g, " ")
      .trim();
  }

  // http date

  const rfc1123 =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    rfc850 =
      /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    ascii =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

  function extractRFC1123Or850(match) {
    const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
  }

  function extractASCII(match) {
    const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
  }

  const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
  const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
  const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
  const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);

  const extractISOYmdTimeAndOffset = combineExtractors(
    extractISOYmd,
    extractISOTime,
    extractISOOffset,
    extractIANAZone
  );
  const extractISOWeekTimeAndOffset = combineExtractors(
    extractISOWeekData,
    extractISOTime,
    extractISOOffset,
    extractIANAZone
  );
  const extractISOOrdinalDateAndTime = combineExtractors(
    extractISOOrdinalData,
    extractISOTime,
    extractISOOffset,
    extractIANAZone
  );
  const extractISOTimeAndOffset = combineExtractors(
    extractISOTime,
    extractISOOffset,
    extractIANAZone
  );

  /*
   * @private
   */

  function parseISODate(s) {
    return parse$1(
      s,
      [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
      [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
      [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime],
      [isoTimeCombinedRegex, extractISOTimeAndOffset]
    );
  }

  function parseRFC2822Date(s) {
    return parse$1(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
  }

  function parseHTTPDate(s) {
    return parse$1(
      s,
      [rfc1123, extractRFC1123Or850],
      [rfc850, extractRFC1123Or850],
      [ascii, extractASCII]
    );
  }

  function parseISODuration(s) {
    return parse$1(s, [isoDuration, extractISODuration]);
  }

  const extractISOTimeOnly = combineExtractors(extractISOTime);

  function parseISOTimeOnly(s) {
    return parse$1(s, [isoTimeOnly, extractISOTimeOnly]);
  }

  const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
  const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);

  const extractISOTimeOffsetAndIANAZone = combineExtractors(
    extractISOTime,
    extractISOOffset,
    extractIANAZone
  );

  function parseSQL(s) {
    return parse$1(
      s,
      [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
      [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
    );
  }

  const INVALID$2 = "Invalid Duration";

  // unit conversion constants
  const lowOrderMatrix = {
      weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1000,
      },
      days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1000,
      },
      hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
      minutes: { seconds: 60, milliseconds: 60 * 1000 },
      seconds: { milliseconds: 1000 },
    },
    casualMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1000,
      },
      quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        seconds: 91 * 24 * 60 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1000,
      },
      months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1000,
      },

      ...lowOrderMatrix,
    },
    daysInYearAccurate = 146097.0 / 400,
    daysInMonthAccurate = 146097.0 / 4800,
    accurateMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000,
      },
      quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: (daysInYearAccurate * 24) / 4,
        minutes: (daysInYearAccurate * 24 * 60) / 4,
        seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
        milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4,
      },
      months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000,
      },
      ...lowOrderMatrix,
    };

  // units ordered by size
  const orderedUnits$1 = [
    "years",
    "quarters",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ];

  const reverseUnits = orderedUnits$1.slice(0).reverse();

  // clone really means "create another instance just like this one, but with these changes"
  function clone$3(dur, alts, clear = false) {
    // deep merge for vals
    const conf = {
      values: clear ? alts.values : { ...dur.values, ...(alts.values || {}) },
      loc: dur.loc.clone(alts.loc),
      conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
      matrix: alts.matrix || dur.matrix,
    };
    return new Duration(conf);
  }

  function durationToMillis(matrix, vals) {
    let sum = vals.milliseconds ?? 0;
    for (const unit of reverseUnits.slice(1)) {
      if (vals[unit]) {
        sum += vals[unit] * matrix[unit]["milliseconds"];
      }
    }
    return sum;
  }

  // NB: mutates parameters
  function normalizeValues(matrix, vals) {
    // the logic below assumes the overall value of the duration is positive
    // if this is not the case, factor is used to make it so
    const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;

    orderedUnits$1.reduceRight((previous, current) => {
      if (!isUndefined(vals[current])) {
        if (previous) {
          const previousVal = vals[previous] * factor;
          const conv = matrix[current][previous];

          // if (previousVal < 0):
          // lower order unit is negative (e.g. { years: 2, days: -2 })
          // normalize this by reducing the higher order unit by the appropriate amount
          // and increasing the lower order unit
          // this can never make the higher order unit negative, because this function only operates
          // on positive durations, so the amount of time represented by the lower order unit cannot
          // be larger than the higher order unit
          // else:
          // lower order unit is positive (e.g. { years: 2, days: 450 } or { years: -2, days: 450 })
          // in this case we attempt to convert as much as possible from the lower order unit into
          // the higher order one
          //
          // Math.floor takes care of both of these cases, rounding away from 0
          // if previousVal < 0 it makes the absolute value larger
          // if previousVal >= it makes the absolute value smaller
          const rollUp = Math.floor(previousVal / conv);
          vals[current] += rollUp * factor;
          vals[previous] -= rollUp * conv * factor;
        }
        return current;
      } else {
        return previous;
      }
    }, null);

    // try to convert any decimals into smaller units if possible
    // for example for { years: 2.5, days: 0, seconds: 0 } we want to get { years: 2, days: 182, hours: 12 }
    orderedUnits$1.reduce((previous, current) => {
      if (!isUndefined(vals[current])) {
        if (previous) {
          const fraction = vals[previous] % 1;
          vals[previous] -= fraction;
          vals[current] += fraction * matrix[previous][current];
        }
        return current;
      } else {
        return previous;
      }
    }, null);
  }

  // Remove all properties with a value of 0 from an object
  function removeZeroes(vals) {
    const newVals = {};
    for (const [key, value] of Object.entries(vals)) {
      if (value !== 0) {
        newVals[key] = value;
      }
    }
    return newVals;
  }

  /**
   * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime#plus} to add a Duration object to a DateTime, producing another DateTime.
   *
   * Here is a brief overview of commonly used methods and getters in Duration:
   *
   * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
   * * **Unit values** See the {@link Duration#years}, {@link Duration#months}, {@link Duration#weeks}, {@link Duration#days}, {@link Duration#hours}, {@link Duration#minutes}, {@link Duration#seconds}, {@link Duration#milliseconds} accessors.
   * * **Configuration** See  {@link Duration#locale} and {@link Duration#numberingSystem} accessors.
   * * **Transformation** To create new Durations out of old ones use {@link Duration#plus}, {@link Duration#minus}, {@link Duration#normalize}, {@link Duration#set}, {@link Duration#reconfigure}, {@link Duration#shiftTo}, and {@link Duration#negate}.
   * * **Output** To convert the Duration into other representations, see {@link Duration#as}, {@link Duration#toISO}, {@link Duration#toFormat}, and {@link Duration#toJSON}
   *
   * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
   */
  class Duration {
    /**
     * @private
     */
    constructor(config) {
      const accurate = config.conversionAccuracy === "longterm" || false;
      let matrix = accurate ? accurateMatrix : casualMatrix;

      if (config.matrix) {
        matrix = config.matrix;
      }

      /**
       * @access private
       */
      this.values = config.values;
      /**
       * @access private
       */
      this.loc = config.loc || Locale.create();
      /**
       * @access private
       */
      this.conversionAccuracy = accurate ? "longterm" : "casual";
      /**
       * @access private
       */
      this.invalid = config.invalid || null;
      /**
       * @access private
       */
      this.matrix = matrix;
      /**
       * @access private
       */
      this.isLuxonDuration = true;
    }

    /**
     * Create Duration from a number of milliseconds.
     * @param {number} count of milliseconds
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    static fromMillis(count, opts) {
      return Duration.fromObject({ milliseconds: count }, opts);
    }

    /**
     * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
     * If this object is empty then a zero milliseconds duration is returned.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.years
     * @param {number} obj.quarters
     * @param {number} obj.months
     * @param {number} obj.weeks
     * @param {number} obj.days
     * @param {number} obj.hours
     * @param {number} obj.minutes
     * @param {number} obj.seconds
     * @param {number} obj.milliseconds
     * @param {Object} [opts=[]] - options for creating this Duration
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
     * @param {string} [opts.matrix=Object] - the custom conversion system to use
     * @return {Duration}
     */
    static fromObject(obj, opts = {}) {
      if (obj == null || typeof obj !== "object") {
        throw new InvalidArgumentError(
          `Duration.fromObject: argument expected to be an object, got ${
          obj === null ? "null" : typeof obj
        }`
        );
      }

      return new Duration({
        values: normalizeObject(obj, Duration.normalizeUnit),
        loc: Locale.fromObject(opts),
        conversionAccuracy: opts.conversionAccuracy,
        matrix: opts.matrix,
      });
    }

    /**
     * Create a Duration from DurationLike.
     *
     * @param {Object | number | Duration} durationLike
     * One of:
     * - object with keys like 'years' and 'hours'.
     * - number representing milliseconds
     * - Duration instance
     * @return {Duration}
     */
    static fromDurationLike(durationLike) {
      if (isNumber$1(durationLike)) {
        return Duration.fromMillis(durationLike);
      } else if (Duration.isDuration(durationLike)) {
        return durationLike;
      } else if (typeof durationLike === "object") {
        return Duration.fromObject(durationLike);
      } else {
        throw new InvalidArgumentError(
          `Unknown duration argument ${durationLike} of type ${typeof durationLike}`
        );
      }
    }

    /**
     * Create a Duration from an ISO 8601 duration string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
     * @param {string} [opts.matrix=Object] - the preset conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
     * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
     * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
     * @return {Duration}
     */
    static fromISO(text, opts) {
      const [parsed] = parseISODuration(text);
      if (parsed) {
        return Duration.fromObject(parsed, opts);
      } else {
        return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
      }
    }

    /**
     * Create a Duration from an ISO 8601 time string.
     * @param {string} text - text to parse
     * @param {Object} opts - options for parsing
     * @param {string} [opts.locale='en-US'] - the locale to use
     * @param {string} opts.numberingSystem - the numbering system to use
     * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
     * @param {string} [opts.matrix=Object] - the conversion system to use
     * @see https://en.wikipedia.org/wiki/ISO_8601#Times
     * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
     * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
     * @return {Duration}
     */
    static fromISOTime(text, opts) {
      const [parsed] = parseISOTimeOnly(text);
      if (parsed) {
        return Duration.fromObject(parsed, opts);
      } else {
        return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
      }
    }

    /**
     * Create an invalid Duration.
     * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Duration}
     */
    static invalid(reason, explanation = null) {
      if (!reason) {
        throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
      }

      const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

      if (Settings.throwOnInvalid) {
        throw new InvalidDurationError(invalid);
      } else {
        return new Duration({ invalid });
      }
    }

    /**
     * @private
     */
    static normalizeUnit(unit) {
      const normalized = {
        year: "years",
        years: "years",
        quarter: "quarters",
        quarters: "quarters",
        month: "months",
        months: "months",
        week: "weeks",
        weeks: "weeks",
        day: "days",
        days: "days",
        hour: "hours",
        hours: "hours",
        minute: "minutes",
        minutes: "minutes",
        second: "seconds",
        seconds: "seconds",
        millisecond: "milliseconds",
        milliseconds: "milliseconds",
      }[unit ? unit.toLowerCase() : unit];

      if (!normalized) throw new InvalidUnitError(unit);

      return normalized;
    }

    /**
     * Check if an object is a Duration. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDuration(o) {
      return (o && o.isLuxonDuration) || false;
    }

    /**
     * Get  the locale of a Duration, such 'en-GB'
     * @type {string}
     */
    get locale() {
      return this.isValid ? this.loc.locale : null;
    }

    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */
    get numberingSystem() {
      return this.isValid ? this.loc.numberingSystem : null;
    }

    /**
     * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
     * * `S` for milliseconds
     * * `s` for seconds
     * * `m` for minutes
     * * `h` for hours
     * * `d` for days
     * * `w` for weeks
     * * `M` for months
     * * `y` for years
     * Notes:
     * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
     * * Tokens can be escaped by wrapping with single quotes.
     * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
     * @param {string} fmt - the format string
     * @param {Object} opts - options
     * @param {boolean} [opts.floor=true] - floor numerical values
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
     * @return {string}
     */
    toFormat(fmt, opts = {}) {
      // reverse-compat since 1.2; we always round down now, never up, and we do it by default
      const fmtOpts = {
        ...opts,
        floor: opts.round !== false && opts.floor !== false,
      };
      return this.isValid
        ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
        : INVALID$2;
    }

    /**
     * Returns a string representation of a Duration with all units included.
     * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
     * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
     * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
     * @example
     * ```js
     * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
     * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
     * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
     * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
     * ```
     */
    toHuman(opts = {}) {
      if (!this.isValid) return INVALID$2;

      const l = orderedUnits$1
        .map((unit) => {
          const val = this.values[unit];
          if (isUndefined(val)) {
            return null;
          }
          return this.loc
            .numberFormatter({ style: "unit", unitDisplay: "long", ...opts, unit: unit.slice(0, -1) })
            .format(val);
        })
        .filter((n) => n);

      return this.loc
        .listFormatter({ type: "conjunction", style: opts.listStyle || "narrow", ...opts })
        .format(l);
    }

    /**
     * Returns a JavaScript object with this Duration's values.
     * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
     * @return {Object}
     */
    toObject() {
      if (!this.isValid) return {};
      return { ...this.values };
    }

    /**
     * Returns an ISO 8601-compliant string representation of this Duration.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
     * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
     * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
     * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
     * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
     * @return {string}
     */
    toISO() {
      // we could use the formatter, but this is an easier way to get the minimum string
      if (!this.isValid) return null;

      let s = "P";
      if (this.years !== 0) s += this.years + "Y";
      if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
      if (this.weeks !== 0) s += this.weeks + "W";
      if (this.days !== 0) s += this.days + "D";
      if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
        s += "T";
      if (this.hours !== 0) s += this.hours + "H";
      if (this.minutes !== 0) s += this.minutes + "M";
      if (this.seconds !== 0 || this.milliseconds !== 0)
        // this will handle "floating point madness" by removing extra decimal places
        // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
        s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
      if (s === "P") s += "T0S";
      return s;
    }

    /**
     * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
     * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Times
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
     * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
     * @return {string}
     */
    toISOTime(opts = {}) {
      if (!this.isValid) return null;

      const millis = this.toMillis();
      if (millis < 0 || millis >= 86400000) return null;

      opts = {
        suppressMilliseconds: false,
        suppressSeconds: false,
        includePrefix: false,
        format: "extended",
        ...opts,
        includeOffset: false,
      };

      const dateTime = DateTime.fromMillis(millis, { zone: "UTC" });
      return dateTime.toISOTime(opts);
    }

    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
      return this.toISO();
    }

    /**
     * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
     * @return {string}
     */
    toString() {
      return this.toISO();
    }

    /**
     * Returns a string representation of this Duration appropriate for the REPL.
     * @return {string}
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
      if (this.isValid) {
        return `Duration { values: ${JSON.stringify(this.values)} }`;
      } else {
        return `Duration { Invalid, reason: ${this.invalidReason} }`;
      }
    }

    /**
     * Returns an milliseconds value of this Duration.
     * @return {number}
     */
    toMillis() {
      if (!this.isValid) return NaN;

      return durationToMillis(this.matrix, this.values);
    }

    /**
     * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
     * @return {number}
     */
    valueOf() {
      return this.toMillis();
    }

    /**
     * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    plus(duration) {
      if (!this.isValid) return this;

      const dur = Duration.fromDurationLike(duration),
        result = {};

      for (const k of orderedUnits$1) {
        if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
          result[k] = dur.get(k) + this.get(k);
        }
      }

      return clone$3(this, { values: result }, true);
    }

    /**
     * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @return {Duration}
     */
    minus(duration) {
      if (!this.isValid) return this;

      const dur = Duration.fromDurationLike(duration);
      return this.plus(dur.negate());
    }

    /**
     * Scale this Duration by the specified amount. Return a newly-constructed Duration.
     * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
     * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
     * @return {Duration}
     */
    mapUnits(fn) {
      if (!this.isValid) return this;
      const result = {};
      for (const k of Object.keys(this.values)) {
        result[k] = asNumber(fn(this.values[k], k));
      }
      return clone$3(this, { values: result }, true);
    }

    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
     * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
     * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
     * @return {number}
     */
    get(unit) {
      return this[Duration.normalizeUnit(unit)];
    }

    /**
     * "Set" the values of specified units. Return a newly-constructed Duration.
     * @param {Object} values - a mapping of units to numbers
     * @example dur.set({ years: 2017 })
     * @example dur.set({ hours: 8, minutes: 30 })
     * @return {Duration}
     */
    set(values) {
      if (!this.isValid) return this;

      const mixed = { ...this.values, ...normalizeObject(values, Duration.normalizeUnit) };
      return clone$3(this, { values: mixed });
    }

    /**
     * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
     * @example dur.reconfigure({ locale: 'en-GB' })
     * @return {Duration}
     */
    reconfigure({ locale, numberingSystem, conversionAccuracy, matrix } = {}) {
      const loc = this.loc.clone({ locale, numberingSystem });
      const opts = { loc, matrix, conversionAccuracy };
      return clone$3(this, opts);
    }

    /**
     * Return the length of the duration in the specified unit.
     * @param {string} unit - a unit such as 'minutes' or 'days'
     * @example Duration.fromObject({years: 1}).as('days') //=> 365
     * @example Duration.fromObject({years: 1}).as('months') //=> 12
     * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
     * @return {number}
     */
    as(unit) {
      return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
    }

    /**
     * Reduce this Duration to its canonical representation in its current units.
     * Assuming the overall value of the Duration is positive, this means:
     * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
     * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
     *   the overall value would be negative, see third example)
     * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
     *
     * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
     * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
     * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
     * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
     * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
     * @return {Duration}
     */
    normalize() {
      if (!this.isValid) return this;
      const vals = this.toObject();
      normalizeValues(this.matrix, vals);
      return clone$3(this, { values: vals }, true);
    }

    /**
     * Rescale units to its largest representation
     * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
     * @return {Duration}
     */
    rescale() {
      if (!this.isValid) return this;
      const vals = removeZeroes(this.normalize().shiftToAll().toObject());
      return clone$3(this, { values: vals }, true);
    }

    /**
     * Convert this Duration into its representation in a different set of units.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
     * @return {Duration}
     */
    shiftTo(...units) {
      if (!this.isValid) return this;

      if (units.length === 0) {
        return this;
      }

      units = units.map((u) => Duration.normalizeUnit(u));

      const built = {},
        accumulated = {},
        vals = this.toObject();
      let lastUnit;

      for (const k of orderedUnits$1) {
        if (units.indexOf(k) >= 0) {
          lastUnit = k;

          let own = 0;

          // anything we haven't boiled down yet should get boiled to this unit
          for (const ak in accumulated) {
            own += this.matrix[ak][k] * accumulated[ak];
            accumulated[ak] = 0;
          }

          // plus anything that's already in this unit
          if (isNumber$1(vals[k])) {
            own += vals[k];
          }

          // only keep the integer part for now in the hopes of putting any decimal part
          // into a smaller unit later
          const i = Math.trunc(own);
          built[k] = i;
          accumulated[k] = (own * 1000 - i * 1000) / 1000;

          // otherwise, keep it in the wings to boil it later
        } else if (isNumber$1(vals[k])) {
          accumulated[k] = vals[k];
        }
      }

      // anything leftover becomes the decimal for the last unit
      // lastUnit must be defined since units is not empty
      for (const key in accumulated) {
        if (accumulated[key] !== 0) {
          built[lastUnit] +=
            key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
        }
      }

      normalizeValues(this.matrix, built);
      return clone$3(this, { values: built }, true);
    }

    /**
     * Shift this Duration to all available units.
     * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
     * @return {Duration}
     */
    shiftToAll() {
      if (!this.isValid) return this;
      return this.shiftTo(
        "years",
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds"
      );
    }

    /**
     * Return the negative of this Duration.
     * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
     * @return {Duration}
     */
    negate() {
      if (!this.isValid) return this;
      const negated = {};
      for (const k of Object.keys(this.values)) {
        negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
      }
      return clone$3(this, { values: negated }, true);
    }

    /**
     * Get the years.
     * @type {number}
     */
    get years() {
      return this.isValid ? this.values.years || 0 : NaN;
    }

    /**
     * Get the quarters.
     * @type {number}
     */
    get quarters() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }

    /**
     * Get the months.
     * @type {number}
     */
    get months() {
      return this.isValid ? this.values.months || 0 : NaN;
    }

    /**
     * Get the weeks
     * @type {number}
     */
    get weeks() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }

    /**
     * Get the days.
     * @type {number}
     */
    get days() {
      return this.isValid ? this.values.days || 0 : NaN;
    }

    /**
     * Get the hours.
     * @type {number}
     */
    get hours() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }

    /**
     * Get the minutes.
     * @type {number}
     */
    get minutes() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }

    /**
     * Get the seconds.
     * @return {number}
     */
    get seconds() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }

    /**
     * Get the milliseconds.
     * @return {number}
     */
    get milliseconds() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }

    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */
    get isValid() {
      return this.invalid === null;
    }

    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }

    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }

    /**
     * Equality check
     * Two Durations are equal iff they have the same units and the same values for each unit.
     * @param {Duration} other
     * @return {boolean}
     */
    equals(other) {
      if (!this.isValid || !other.isValid) {
        return false;
      }

      if (!this.loc.equals(other.loc)) {
        return false;
      }

      function eq(v1, v2) {
        // Consider 0 and undefined as equal
        if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
        return v1 === v2;
      }

      for (const u of orderedUnits$1) {
        if (!eq(this.values[u], other.values[u])) {
          return false;
        }
      }
      return true;
    }
  }

  const INVALID$1 = "Invalid Interval";

  // checks if the start is equal to or before the end
  function validateStartEnd(start, end) {
    if (!start || !start.isValid) {
      return Interval.invalid("missing or invalid start");
    } else if (!end || !end.isValid) {
      return Interval.invalid("missing or invalid end");
    } else if (end < start) {
      return Interval.invalid(
        "end before start",
        `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
      );
    } else {
      return null;
    }
  }

  /**
   * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
   *
   * Here is a brief overview of the most commonly used methods and getters in Interval:
   *
   * * **Creation** To create an Interval, use {@link Interval.fromDateTimes}, {@link Interval.after}, {@link Interval.before}, or {@link Interval.fromISO}.
   * * **Accessors** Use {@link Interval#start} and {@link Interval#end} to get the start and end.
   * * **Interrogation** To analyze the Interval, use {@link Interval#count}, {@link Interval#length}, {@link Interval#hasSame}, {@link Interval#contains}, {@link Interval#isAfter}, or {@link Interval#isBefore}.
   * * **Transformation** To create other Intervals out of this one, use {@link Interval#set}, {@link Interval#splitAt}, {@link Interval#splitBy}, {@link Interval#divideEqually}, {@link Interval.merge}, {@link Interval.xor}, {@link Interval#union}, {@link Interval#intersection}, or {@link Interval#difference}.
   * * **Comparison** To compare this Interval to another one, use {@link Interval#equals}, {@link Interval#overlaps}, {@link Interval#abutsStart}, {@link Interval#abutsEnd}, {@link Interval#engulfs}
   * * **Output** To convert the Interval into other representations, see {@link Interval#toString}, {@link Interval#toLocaleString}, {@link Interval#toISO}, {@link Interval#toISODate}, {@link Interval#toISOTime}, {@link Interval#toFormat}, and {@link Interval#toDuration}.
   */
  class Interval {
    /**
     * @private
     */
    constructor(config) {
      /**
       * @access private
       */
      this.s = config.start;
      /**
       * @access private
       */
      this.e = config.end;
      /**
       * @access private
       */
      this.invalid = config.invalid || null;
      /**
       * @access private
       */
      this.isLuxonInterval = true;
    }

    /**
     * Create an invalid Interval.
     * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {Interval}
     */
    static invalid(reason, explanation = null) {
      if (!reason) {
        throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
      }

      const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

      if (Settings.throwOnInvalid) {
        throw new InvalidIntervalError(invalid);
      } else {
        return new Interval({ invalid });
      }
    }

    /**
     * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
     * @param {DateTime|Date|Object} start
     * @param {DateTime|Date|Object} end
     * @return {Interval}
     */
    static fromDateTimes(start, end) {
      const builtStart = friendlyDateTime(start),
        builtEnd = friendlyDateTime(end);

      const validateError = validateStartEnd(builtStart, builtEnd);

      if (validateError == null) {
        return new Interval({
          start: builtStart,
          end: builtEnd,
        });
      } else {
        return validateError;
      }
    }

    /**
     * Create an Interval from a start DateTime and a Duration to extend to.
     * @param {DateTime|Date|Object} start
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static after(start, duration) {
      const dur = Duration.fromDurationLike(duration),
        dt = friendlyDateTime(start);
      return Interval.fromDateTimes(dt, dt.plus(dur));
    }

    /**
     * Create an Interval from an end DateTime and a Duration to extend backwards to.
     * @param {DateTime|Date|Object} end
     * @param {Duration|Object|number} duration - the length of the Interval.
     * @return {Interval}
     */
    static before(end, duration) {
      const dur = Duration.fromDurationLike(duration),
        dt = friendlyDateTime(end);
      return Interval.fromDateTimes(dt.minus(dur), dt);
    }

    /**
     * Create an Interval from an ISO 8601 string.
     * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
     * @param {string} text - the ISO string to parse
     * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {Interval}
     */
    static fromISO(text, opts) {
      const [s, e] = (text || "").split("/", 2);
      if (s && e) {
        let start, startIsValid;
        try {
          start = DateTime.fromISO(s, opts);
          startIsValid = start.isValid;
        } catch (e) {
          startIsValid = false;
        }

        let end, endIsValid;
        try {
          end = DateTime.fromISO(e, opts);
          endIsValid = end.isValid;
        } catch (e) {
          endIsValid = false;
        }

        if (startIsValid && endIsValid) {
          return Interval.fromDateTimes(start, end);
        }

        if (startIsValid) {
          const dur = Duration.fromISO(e, opts);
          if (dur.isValid) {
            return Interval.after(start, dur);
          }
        } else if (endIsValid) {
          const dur = Duration.fromISO(s, opts);
          if (dur.isValid) {
            return Interval.before(end, dur);
          }
        }
      }
      return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }

    /**
     * Check if an object is an Interval. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isInterval(o) {
      return (o && o.isLuxonInterval) || false;
    }

    /**
     * Returns the start of the Interval
     * @type {DateTime}
     */
    get start() {
      return this.isValid ? this.s : null;
    }

    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */
    get end() {
      return this.isValid ? this.e : null;
    }

    /**
     * Returns the last DateTime included in the interval (since end is not part of the interval)
     * @type {DateTime}
     */
    get lastDateTime() {
      return this.isValid ? (this.e ? this.e.minus(1) : null) : null;
    }

    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */
    get isValid() {
      return this.invalidReason === null;
    }

    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }

    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }

    /**
     * Returns the length of the Interval in the specified unit.
     * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
     * @return {number}
     */
    length(unit = "milliseconds") {
      return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
    }

    /**
     * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
     * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
     * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
     * @param {string} [unit='milliseconds'] - the unit of time to count.
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
     * @return {number}
     */
    count(unit = "milliseconds", opts) {
      if (!this.isValid) return NaN;
      const start = this.start.startOf(unit, opts);
      let end;
      if (opts?.useLocaleWeeks) {
        end = this.end.reconfigure({ locale: start.locale });
      } else {
        end = this.end;
      }
      end = end.startOf(unit, opts);
      return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
    }

    /**
     * Returns whether this Interval's start and end are both in the same unit of time
     * @param {string} unit - the unit of time to check sameness on
     * @return {boolean}
     */
    hasSame(unit) {
      return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
    }

    /**
     * Return whether this Interval has the same start and end DateTimes.
     * @return {boolean}
     */
    isEmpty() {
      return this.s.valueOf() === this.e.valueOf();
    }

    /**
     * Return whether this Interval's start is after the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isAfter(dateTime) {
      if (!this.isValid) return false;
      return this.s > dateTime;
    }

    /**
     * Return whether this Interval's end is before the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    isBefore(dateTime) {
      if (!this.isValid) return false;
      return this.e <= dateTime;
    }

    /**
     * Return whether this Interval contains the specified DateTime.
     * @param {DateTime} dateTime
     * @return {boolean}
     */
    contains(dateTime) {
      if (!this.isValid) return false;
      return this.s <= dateTime && this.e > dateTime;
    }

    /**
     * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
     * @param {Object} values - the values to set
     * @param {DateTime} values.start - the starting DateTime
     * @param {DateTime} values.end - the ending DateTime
     * @return {Interval}
     */
    set({ start, end } = {}) {
      if (!this.isValid) return this;
      return Interval.fromDateTimes(start || this.s, end || this.e);
    }

    /**
     * Split this Interval at each of the specified DateTimes
     * @param {...DateTime} dateTimes - the unit of time to count.
     * @return {Array}
     */
    splitAt(...dateTimes) {
      if (!this.isValid) return [];
      const sorted = dateTimes
          .map(friendlyDateTime)
          .filter((d) => this.contains(d))
          .sort((a, b) => a.toMillis() - b.toMillis()),
        results = [];
      let { s } = this,
        i = 0;

      while (s < this.e) {
        const added = sorted[i] || this.e,
          next = +added > +this.e ? this.e : added;
        results.push(Interval.fromDateTimes(s, next));
        s = next;
        i += 1;
      }

      return results;
    }

    /**
     * Split this Interval into smaller Intervals, each of the specified length.
     * Left over time is grouped into a smaller interval
     * @param {Duration|Object|number} duration - The length of each resulting interval.
     * @return {Array}
     */
    splitBy(duration) {
      const dur = Duration.fromDurationLike(duration);

      if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
        return [];
      }

      let { s } = this,
        idx = 1,
        next;

      const results = [];
      while (s < this.e) {
        const added = this.start.plus(dur.mapUnits((x) => x * idx));
        next = +added > +this.e ? this.e : added;
        results.push(Interval.fromDateTimes(s, next));
        s = next;
        idx += 1;
      }

      return results;
    }

    /**
     * Split this Interval into the specified number of smaller intervals.
     * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
     * @return {Array}
     */
    divideEqually(numberOfParts) {
      if (!this.isValid) return [];
      return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
    }

    /**
     * Return whether this Interval overlaps with the specified Interval
     * @param {Interval} other
     * @return {boolean}
     */
    overlaps(other) {
      return this.e > other.s && this.s < other.e;
    }

    /**
     * Return whether this Interval's end is adjacent to the specified Interval's start.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsStart(other) {
      if (!this.isValid) return false;
      return +this.e === +other.s;
    }

    /**
     * Return whether this Interval's start is adjacent to the specified Interval's end.
     * @param {Interval} other
     * @return {boolean}
     */
    abutsEnd(other) {
      if (!this.isValid) return false;
      return +other.e === +this.s;
    }

    /**
     * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
     * @param {Interval} other
     * @return {boolean}
     */
    engulfs(other) {
      if (!this.isValid) return false;
      return this.s <= other.s && this.e >= other.e;
    }

    /**
     * Return whether this Interval has the same start and end as the specified Interval.
     * @param {Interval} other
     * @return {boolean}
     */
    equals(other) {
      if (!this.isValid || !other.isValid) {
        return false;
      }

      return this.s.equals(other.s) && this.e.equals(other.e);
    }

    /**
     * Return an Interval representing the intersection of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
     * Returns null if the intersection is empty, meaning, the intervals don't intersect.
     * @param {Interval} other
     * @return {Interval}
     */
    intersection(other) {
      if (!this.isValid) return this;
      const s = this.s > other.s ? this.s : other.s,
        e = this.e < other.e ? this.e : other.e;

      if (s >= e) {
        return null;
      } else {
        return Interval.fromDateTimes(s, e);
      }
    }

    /**
     * Return an Interval representing the union of this Interval and the specified Interval.
     * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
     * @param {Interval} other
     * @return {Interval}
     */
    union(other) {
      if (!this.isValid) return this;
      const s = this.s < other.s ? this.s : other.s,
        e = this.e > other.e ? this.e : other.e;
      return Interval.fromDateTimes(s, e);
    }

    /**
     * Merge an array of Intervals into an equivalent minimal set of Intervals.
     * Combines overlapping and adjacent Intervals.
     * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
     * and ending with the latest.
     *
     * @param {Array} intervals
     * @return {Array}
     */
    static merge(intervals) {
      const [found, final] = intervals
        .sort((a, b) => a.s - b.s)
        .reduce(
          ([sofar, current], item) => {
            if (!current) {
              return [sofar, item];
            } else if (current.overlaps(item) || current.abutsStart(item)) {
              return [sofar, current.union(item)];
            } else {
              return [sofar.concat([current]), item];
            }
          },
          [[], null]
        );
      if (final) {
        found.push(final);
      }
      return found;
    }

    /**
     * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
     * @param {Array} intervals
     * @return {Array}
     */
    static xor(intervals) {
      let start = null,
        currentCount = 0;
      const results = [],
        ends = intervals.map((i) => [
          { time: i.s, type: "s" },
          { time: i.e, type: "e" },
        ]),
        flattened = Array.prototype.concat(...ends),
        arr = flattened.sort((a, b) => a.time - b.time);

      for (const i of arr) {
        currentCount += i.type === "s" ? 1 : -1;

        if (currentCount === 1) {
          start = i.time;
        } else {
          if (start && +start !== +i.time) {
            results.push(Interval.fromDateTimes(start, i.time));
          }

          start = null;
        }
      }

      return Interval.merge(results);
    }

    /**
     * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
     * @param {...Interval} intervals
     * @return {Array}
     */
    difference(...intervals) {
      return Interval.xor([this].concat(intervals))
        .map((i) => this.intersection(i))
        .filter((i) => i && !i.isEmpty());
    }

    /**
     * Returns a string representation of this Interval appropriate for debugging.
     * @return {string}
     */
    toString() {
      if (!this.isValid) return INVALID$1;
      return `[${this.s.toISO()} – ${this.e.toISO()})`;
    }

    /**
     * Returns a string representation of this Interval appropriate for the REPL.
     * @return {string}
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
      if (this.isValid) {
        return `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`;
      } else {
        return `Interval { Invalid, reason: ${this.invalidReason} }`;
      }
    }

    /**
     * Returns a localized string representing this Interval. Accepts the same options as the
     * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
     * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
     * is browser-specific, but in general it will return an appropriate representation of the
     * Interval in the assigned locale. Defaults to the system's locale if no locale has been
     * specified.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
     * Intl.DateTimeFormat constructor options.
     * @param {Object} opts - Options to override the configuration of the start DateTime.
     * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
     * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
     * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
     * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
     * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
     * @return {string}
     */
    toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
      return this.isValid
        ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this)
        : INVALID$1;
    }

    /**
     * Returns an ISO 8601-compliant string representation of this Interval.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime#toISO}
     * @return {string}
     */
    toISO(opts) {
      if (!this.isValid) return INVALID$1;
      return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
    }

    /**
     * Returns an ISO 8601-compliant string representation of date of this Interval.
     * The time components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @return {string}
     */
    toISODate() {
      if (!this.isValid) return INVALID$1;
      return `${this.s.toISODate()}/${this.e.toISODate()}`;
    }

    /**
     * Returns an ISO 8601-compliant string representation of time of this Interval.
     * The date components are ignored.
     * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
     * @param {Object} opts - The same options as {@link DateTime#toISO}
     * @return {string}
     */
    toISOTime(opts) {
      if (!this.isValid) return INVALID$1;
      return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
    }

    /**
     * Returns a string representation of this Interval formatted according to the specified format
     * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
     * formatting tool.
     * @param {string} dateFormat - The format string. This string formats the start and end time.
     * See {@link DateTime#toFormat} for details.
     * @param {Object} opts - Options.
     * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
     * representations.
     * @return {string}
     */
    toFormat(dateFormat, { separator = " – " } = {}) {
      if (!this.isValid) return INVALID$1;
      return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
    }

    /**
     * Return a Duration representing the time spanned by this interval.
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
     * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
     * @return {Duration}
     */
    toDuration(unit, opts) {
      if (!this.isValid) {
        return Duration.invalid(this.invalidReason);
      }
      return this.e.diff(this.s, unit, opts);
    }

    /**
     * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
     * @param {function} mapFn
     * @return {Interval}
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
     * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
     */
    mapEndpoints(mapFn) {
      return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
    }
  }

  /**
   * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
   */
  class Info {
    /**
     * Return whether the specified zone contains a DST.
     * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
     * @return {boolean}
     */
    static hasDST(zone = Settings.defaultZone) {
      const proto = DateTime.now().setZone(zone).set({ month: 12 });

      return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
    }

    /**
     * Return whether the specified zone is a valid IANA specifier.
     * @param {string} zone - Zone to check
     * @return {boolean}
     */
    static isValidIANAZone(zone) {
      return IANAZone.isValidZone(zone);
    }

    /**
     * Converts the input into a {@link Zone} instance.
     *
     * * If `input` is already a Zone instance, it is returned unchanged.
     * * If `input` is a string containing a valid time zone name, a Zone instance
     *   with that name is returned.
     * * If `input` is a string that doesn't refer to a known time zone, a Zone
     *   instance with {@link Zone#isValid} == false is returned.
     * * If `input is a number, a Zone instance with the specified fixed offset
     *   in minutes is returned.
     * * If `input` is `null` or `undefined`, the default zone is returned.
     * @param {string|Zone|number} [input] - the value to be converted
     * @return {Zone}
     */
    static normalizeZone(input) {
      return normalizeZone(input, Settings.defaultZone);
    }

    /**
     * Get the weekday on which the week starts according to the given locale.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
     */
    static getStartOfWeek({ locale = null, locObj = null } = {}) {
      return (locObj || Locale.create(locale)).getStartOfWeek();
    }

    /**
     * Get the minimum number of days necessary in a week before it is considered part of the next year according
     * to the given locale.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @returns {number}
     */
    static getMinimumDaysInFirstWeek({ locale = null, locObj = null } = {}) {
      return (locObj || Locale.create(locale)).getMinDaysInFirstWeek();
    }

    /**
     * Get the weekdays, which are considered the weekend according to the given locale
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
     */
    static getWeekendWeekdays({ locale = null, locObj = null } = {}) {
      // copy the array, because we cache it internally
      return (locObj || Locale.create(locale)).getWeekendDays().slice();
    }

    /**
     * Return an array of standalone month names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @example Info.months()[0] //=> 'January'
     * @example Info.months('short')[0] //=> 'Jan'
     * @example Info.months('numeric')[0] //=> '1'
     * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
     * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
     * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
     * @return {Array}
     */
    static months(
      length = "long",
      { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}
    ) {
      return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
    }

    /**
     * Return an array of format month names.
     * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
     * changes the string.
     * See {@link Info#months}
     * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @param {string} [opts.outputCalendar='gregory'] - the calendar
     * @return {Array}
     */
    static monthsFormat(
      length = "long",
      { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}
    ) {
      return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
    }

    /**
     * Return an array of standalone week names.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @example Info.weekdays()[0] //=> 'Monday'
     * @example Info.weekdays('short')[0] //=> 'Mon'
     * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
     * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
     * @return {Array}
     */
    static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
      return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
    }

    /**
     * Return an array of format week names.
     * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
     * changes the string.
     * See {@link Info#weekdays}
     * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale=null] - the locale code
     * @param {string} [opts.numberingSystem=null] - the numbering system
     * @param {string} [opts.locObj=null] - an existing locale object to use
     * @return {Array}
     */
    static weekdaysFormat(
      length = "long",
      { locale = null, numberingSystem = null, locObj = null } = {}
    ) {
      return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
    }

    /**
     * Return an array of meridiems.
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.meridiems() //=> [ 'AM', 'PM' ]
     * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
     * @return {Array}
     */
    static meridiems({ locale = null } = {}) {
      return Locale.create(locale).meridiems();
    }

    /**
     * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
     * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
     * @param {Object} opts - options
     * @param {string} [opts.locale] - the locale code
     * @example Info.eras() //=> [ 'BC', 'AD' ]
     * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
     * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
     * @return {Array}
     */
    static eras(length = "short", { locale = null } = {}) {
      return Locale.create(locale, null, "gregory").eras(length);
    }

    /**
     * Return the set of available features in this environment.
     * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
     * Keys:
     * * `relative`: whether this environment supports relative time formatting
     * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
     * @example Info.features() //=> { relative: false, localeWeek: true }
     * @return {Object}
     */
    static features() {
      return { relative: hasRelative(), localeWeek: hasLocaleWeekInfo() };
    }
  }

  function dayDiff(earlier, later) {
    const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(),
      ms = utcDayStart(later) - utcDayStart(earlier);
    return Math.floor(Duration.fromMillis(ms).as("days"));
  }

  function highOrderDiffs(cursor, later, units) {
    const differs = [
      ["years", (a, b) => b.year - a.year],
      ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4],
      ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
      [
        "weeks",
        (a, b) => {
          const days = dayDiff(a, b);
          return (days - (days % 7)) / 7;
        },
      ],
      ["days", dayDiff],
    ];

    const results = {};
    const earlier = cursor;
    let lowestOrder, highWater;

    /* This loop tries to diff using larger units first.
       If we overshoot, we backtrack and try the next smaller unit.
       "cursor" starts out at the earlier timestamp and moves closer and closer to "later"
       as we use smaller and smaller units.
       highWater keeps track of where we would be if we added one more of the smallest unit,
       this is used later to potentially convert any difference smaller than the smallest higher order unit
       into a fraction of that smallest higher order unit
    */
    for (const [unit, differ] of differs) {
      if (units.indexOf(unit) >= 0) {
        lowestOrder = unit;

        results[unit] = differ(cursor, later);
        highWater = earlier.plus(results);

        if (highWater > later) {
          // we overshot the end point, backtrack cursor by 1
          results[unit]--;
          cursor = earlier.plus(results);

          // if we are still overshooting now, we need to backtrack again
          // this happens in certain situations when diffing times in different zones,
          // because this calculation ignores time zones
          if (cursor > later) {
            // keep the "overshot by 1" around as highWater
            highWater = cursor;
            // backtrack cursor by 1
            results[unit]--;
            cursor = earlier.plus(results);
          }
        } else {
          cursor = highWater;
        }
      }
    }

    return [cursor, results, highWater, lowestOrder];
  }

  function diff (earlier, later, units, opts) {
    let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

    const remainingMillis = later - cursor;

    const lowerOrderUnits = units.filter(
      (u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
    );

    if (lowerOrderUnits.length === 0) {
      if (highWater < later) {
        highWater = cursor.plus({ [lowestOrder]: 1 });
      }

      if (highWater !== cursor) {
        results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
      }
    }

    const duration = Duration.fromObject(results, opts);

    if (lowerOrderUnits.length > 0) {
      return Duration.fromMillis(remainingMillis, opts)
        .shiftTo(...lowerOrderUnits)
        .plus(duration);
    } else {
      return duration;
    }
  }

  const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

  function intUnit(regex, post = (i) => i) {
    return { regex, deser: ([s]) => post(parseDigits(s)) };
  }

  const NBSP = String.fromCharCode(160);
  const spaceOrNBSP = `[ ${NBSP}]`;
  const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

  function fixListRegex(s) {
    // make dots optional and also make them literal
    // make space and non breakable space characters interchangeable
    return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
  }

  function stripInsensitivities(s) {
    return s
      .replace(/\./g, "") // ignore dots that were made optional
      .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
      .toLowerCase();
  }

  function oneOf(strings, startIndex) {
    if (strings === null) {
      return null;
    } else {
      return {
        regex: RegExp(strings.map(fixListRegex).join("|")),
        deser: ([s]) =>
          strings.findIndex((i) => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex,
      };
    }
  }

  function offset(regex, groups) {
    return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
  }

  function simple(regex) {
    return { regex, deser: ([s]) => s };
  }

  function escapeToken(value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  /**
   * @param token
   * @param {Locale} loc
   */
  function unitForToken(token, loc) {
    const one = digitRegex(loc),
      two = digitRegex(loc, "{2}"),
      three = digitRegex(loc, "{3}"),
      four = digitRegex(loc, "{4}"),
      six = digitRegex(loc, "{6}"),
      oneOrTwo = digitRegex(loc, "{1,2}"),
      oneToThree = digitRegex(loc, "{1,3}"),
      oneToSix = digitRegex(loc, "{1,6}"),
      oneToNine = digitRegex(loc, "{1,9}"),
      twoToFour = digitRegex(loc, "{2,4}"),
      fourToSix = digitRegex(loc, "{4,6}"),
      literal = (t) => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }),
      unitate = (t) => {
        if (token.literal) {
          return literal(t);
        }
        switch (t.val) {
          // era
          case "G":
            return oneOf(loc.eras("short"), 0);
          case "GG":
            return oneOf(loc.eras("long"), 0);
          // years
          case "y":
            return intUnit(oneToSix);
          case "yy":
            return intUnit(twoToFour, untruncateYear);
          case "yyyy":
            return intUnit(four);
          case "yyyyy":
            return intUnit(fourToSix);
          case "yyyyyy":
            return intUnit(six);
          // months
          case "M":
            return intUnit(oneOrTwo);
          case "MM":
            return intUnit(two);
          case "MMM":
            return oneOf(loc.months("short", true), 1);
          case "MMMM":
            return oneOf(loc.months("long", true), 1);
          case "L":
            return intUnit(oneOrTwo);
          case "LL":
            return intUnit(two);
          case "LLL":
            return oneOf(loc.months("short", false), 1);
          case "LLLL":
            return oneOf(loc.months("long", false), 1);
          // dates
          case "d":
            return intUnit(oneOrTwo);
          case "dd":
            return intUnit(two);
          // ordinals
          case "o":
            return intUnit(oneToThree);
          case "ooo":
            return intUnit(three);
          // time
          case "HH":
            return intUnit(two);
          case "H":
            return intUnit(oneOrTwo);
          case "hh":
            return intUnit(two);
          case "h":
            return intUnit(oneOrTwo);
          case "mm":
            return intUnit(two);
          case "m":
            return intUnit(oneOrTwo);
          case "q":
            return intUnit(oneOrTwo);
          case "qq":
            return intUnit(two);
          case "s":
            return intUnit(oneOrTwo);
          case "ss":
            return intUnit(two);
          case "S":
            return intUnit(oneToThree);
          case "SSS":
            return intUnit(three);
          case "u":
            return simple(oneToNine);
          case "uu":
            return simple(oneOrTwo);
          case "uuu":
            return intUnit(one);
          // meridiem
          case "a":
            return oneOf(loc.meridiems(), 0);
          // weekYear (k)
          case "kkkk":
            return intUnit(four);
          case "kk":
            return intUnit(twoToFour, untruncateYear);
          // weekNumber (W)
          case "W":
            return intUnit(oneOrTwo);
          case "WW":
            return intUnit(two);
          // weekdays
          case "E":
          case "c":
            return intUnit(one);
          case "EEE":
            return oneOf(loc.weekdays("short", false), 1);
          case "EEEE":
            return oneOf(loc.weekdays("long", false), 1);
          case "ccc":
            return oneOf(loc.weekdays("short", true), 1);
          case "cccc":
            return oneOf(loc.weekdays("long", true), 1);
          // offset/zone
          case "Z":
          case "ZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
          case "ZZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
          // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
          // because we don't have any way to figure out what they are
          case "z":
            return simple(/[a-z_+-/]{1,256}?/i);
          // this special-case "token" represents a place where a macro-token expanded into a white-space literal
          // in this case we accept any non-newline white-space
          case " ":
            return simple(/[^\S\n\r]/);
          default:
            return literal(t);
        }
      };

    const unit = unitate(token) || {
      invalidReason: MISSING_FTP,
    };

    unit.token = token;

    return unit;
  }

  const partTypeStyleToTokenVal = {
    year: {
      "2-digit": "yy",
      numeric: "yyyyy",
    },
    month: {
      numeric: "M",
      "2-digit": "MM",
      short: "MMM",
      long: "MMMM",
    },
    day: {
      numeric: "d",
      "2-digit": "dd",
    },
    weekday: {
      short: "EEE",
      long: "EEEE",
    },
    dayperiod: "a",
    dayPeriod: "a",
    hour12: {
      numeric: "h",
      "2-digit": "hh",
    },
    hour24: {
      numeric: "H",
      "2-digit": "HH",
    },
    minute: {
      numeric: "m",
      "2-digit": "mm",
    },
    second: {
      numeric: "s",
      "2-digit": "ss",
    },
    timeZoneName: {
      long: "ZZZZZ",
      short: "ZZZ",
    },
  };

  function tokenForPart(part, formatOpts, resolvedOpts) {
    const { type, value } = part;

    if (type === "literal") {
      const isSpace = /^\s+$/.test(value);
      return {
        literal: !isSpace,
        val: isSpace ? " " : value,
      };
    }

    const style = formatOpts[type];

    // The user might have explicitly specified hour12 or hourCycle
    // if so, respect their decision
    // if not, refer back to the resolvedOpts, which are based on the locale
    let actualType = type;
    if (type === "hour") {
      if (formatOpts.hour12 != null) {
        actualType = formatOpts.hour12 ? "hour12" : "hour24";
      } else if (formatOpts.hourCycle != null) {
        if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
          actualType = "hour12";
        } else {
          actualType = "hour24";
        }
      } else {
        // tokens only differentiate between 24 hours or not,
        // so we do not need to check hourCycle here, which is less supported anyways
        actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
      }
    }
    let val = partTypeStyleToTokenVal[actualType];
    if (typeof val === "object") {
      val = val[style];
    }

    if (val) {
      return {
        literal: false,
        val,
      };
    }

    return undefined;
  }

  function buildRegex(units) {
    const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
    return [`^${re}$`, units];
  }

  function match(input, regex, handlers) {
    const matches = input.match(regex);

    if (matches) {
      const all = {};
      let matchIndex = 1;
      for (const i in handlers) {
        if (hasOwnProperty(handlers, i)) {
          const h = handlers[i],
            groups = h.groups ? h.groups + 1 : 1;
          if (!h.literal && h.token) {
            all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
          }
          matchIndex += groups;
        }
      }
      return [matches, all];
    } else {
      return [matches, {}];
    }
  }

  function dateTimeFromMatches(matches) {
    const toField = (token) => {
      switch (token) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
        case "H":
          return "hour";
        case "d":
          return "day";
        case "o":
          return "ordinal";
        case "L":
        case "M":
          return "month";
        case "y":
          return "year";
        case "E":
        case "c":
          return "weekday";
        case "W":
          return "weekNumber";
        case "k":
          return "weekYear";
        case "q":
          return "quarter";
        default:
          return null;
      }
    };

    let zone = null;
    let specificOffset;
    if (!isUndefined(matches.z)) {
      zone = IANAZone.create(matches.z);
    }

    if (!isUndefined(matches.Z)) {
      if (!zone) {
        zone = new FixedOffsetZone(matches.Z);
      }
      specificOffset = matches.Z;
    }

    if (!isUndefined(matches.q)) {
      matches.M = (matches.q - 1) * 3 + 1;
    }

    if (!isUndefined(matches.h)) {
      if (matches.h < 12 && matches.a === 1) {
        matches.h += 12;
      } else if (matches.h === 12 && matches.a === 0) {
        matches.h = 0;
      }
    }

    if (matches.G === 0 && matches.y) {
      matches.y = -matches.y;
    }

    if (!isUndefined(matches.u)) {
      matches.S = parseMillis(matches.u);
    }

    const vals = Object.keys(matches).reduce((r, k) => {
      const f = toField(k);
      if (f) {
        r[f] = matches[k];
      }

      return r;
    }, {});

    return [vals, zone, specificOffset];
  }

  let dummyDateTimeCache = null;

  function getDummyDateTime() {
    if (!dummyDateTimeCache) {
      dummyDateTimeCache = DateTime.fromMillis(1555555555555);
    }

    return dummyDateTimeCache;
  }

  function maybeExpandMacroToken(token, locale) {
    if (token.literal) {
      return token;
    }

    const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
    const tokens = formatOptsToTokens(formatOpts, locale);

    if (tokens == null || tokens.includes(undefined)) {
      return token;
    }

    return tokens;
  }

  function expandMacroTokens(tokens, locale) {
    return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
  }

  /**
   * @private
   */

  class TokenParser {
    constructor(locale, format) {
      this.locale = locale;
      this.format = format;
      this.tokens = expandMacroTokens(Formatter.parseFormat(format), locale);
      this.units = this.tokens.map((t) => unitForToken(t, locale));
      this.disqualifyingUnit = this.units.find((t) => t.invalidReason);

      if (!this.disqualifyingUnit) {
        const [regexString, handlers] = buildRegex(this.units);
        this.regex = RegExp(regexString, "i");
        this.handlers = handlers;
      }
    }

    explainFromTokens(input) {
      if (!this.isValid) {
        return { input, tokens: this.tokens, invalidReason: this.invalidReason };
      } else {
        const [rawMatches, matches] = match(input, this.regex, this.handlers),
          [result, zone, specificOffset] = matches
            ? dateTimeFromMatches(matches)
            : [null, null, undefined];
        if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
          throw new ConflictingSpecificationError(
            "Can't include meridiem when specifying 24-hour format"
          );
        }
        return {
          input,
          tokens: this.tokens,
          regex: this.regex,
          rawMatches,
          matches,
          result,
          zone,
          specificOffset,
        };
      }
    }

    get isValid() {
      return !this.disqualifyingUnit;
    }

    get invalidReason() {
      return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
    }
  }

  function explainFromTokens(locale, input, format) {
    const parser = new TokenParser(locale, format);
    return parser.explainFromTokens(input);
  }

  function parseFromTokens(locale, input, format) {
    const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
    return [result, zone, specificOffset, invalidReason];
  }

  function formatOptsToTokens(formatOpts, locale) {
    if (!formatOpts) {
      return null;
    }

    const formatter = Formatter.create(locale, formatOpts);
    const df = formatter.dtFormatter(getDummyDateTime());
    const parts = df.formatToParts();
    const resolvedOpts = df.resolvedOptions();
    return parts.map((p) => tokenForPart(p, formatOpts, resolvedOpts));
  }

  const INVALID = "Invalid DateTime";
  const MAX_DATE = 8.64e15;

  function unsupportedZone(zone) {
    return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
  }

  // we cache week data on the DT object and this intermediates the cache
  /**
   * @param {DateTime} dt
   */
  function possiblyCachedWeekData(dt) {
    if (dt.weekData === null) {
      dt.weekData = gregorianToWeek(dt.c);
    }
    return dt.weekData;
  }

  /**
   * @param {DateTime} dt
   */
  function possiblyCachedLocalWeekData(dt) {
    if (dt.localWeekData === null) {
      dt.localWeekData = gregorianToWeek(
        dt.c,
        dt.loc.getMinDaysInFirstWeek(),
        dt.loc.getStartOfWeek()
      );
    }
    return dt.localWeekData;
  }

  // clone really means, "make a new object with these modifications". all "setters" really use this
  // to create a new object while only changing some of the properties
  function clone$2(inst, alts) {
    const current = {
      ts: inst.ts,
      zone: inst.zone,
      c: inst.c,
      o: inst.o,
      loc: inst.loc,
      invalid: inst.invalid,
    };
    return new DateTime({ ...current, ...alts, old: current });
  }

  // find the right offset a given local time. The o input is our guess, which determines which
  // offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
  function fixOffset(localTS, o, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    let utcGuess = localTS - o * 60 * 1000;

    // Test whether the zone matches the offset for this ts
    const o2 = tz.offset(utcGuess);

    // If so, offset didn't change and we're done
    if (o === o2) {
      return [utcGuess, o];
    }

    // If not, change the ts by the difference in the offset
    utcGuess -= (o2 - o) * 60 * 1000;

    // If that gives us the local time we want, we're done
    const o3 = tz.offset(utcGuess);
    if (o2 === o3) {
      return [utcGuess, o2];
    }

    // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
  }

  // convert an epoch timestamp into a calendar object with the given offset
  function tsToObj(ts, offset) {
    ts += offset * 60 * 1000;

    const d = new Date(ts);

    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
      hour: d.getUTCHours(),
      minute: d.getUTCMinutes(),
      second: d.getUTCSeconds(),
      millisecond: d.getUTCMilliseconds(),
    };
  }

  // convert a calendar object to a epoch timestamp
  function objToTS(obj, offset, zone) {
    return fixOffset(objToLocalTS(obj), offset, zone);
  }

  // create a new DT instance by adding a duration, adjusting for DSTs
  function adjustTime(inst, dur) {
    const oPre = inst.o,
      year = inst.c.year + Math.trunc(dur.years),
      month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
      c = {
        ...inst.c,
        year,
        month,
        day:
          Math.min(inst.c.day, daysInMonth(year, month)) +
          Math.trunc(dur.days) +
          Math.trunc(dur.weeks) * 7,
      },
      millisToAdd = Duration.fromObject({
        years: dur.years - Math.trunc(dur.years),
        quarters: dur.quarters - Math.trunc(dur.quarters),
        months: dur.months - Math.trunc(dur.months),
        weeks: dur.weeks - Math.trunc(dur.weeks),
        days: dur.days - Math.trunc(dur.days),
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds,
      }).as("milliseconds"),
      localTS = objToLocalTS(c);

    let [ts, o] = fixOffset(localTS, oPre, inst.zone);

    if (millisToAdd !== 0) {
      ts += millisToAdd;
      // that could have changed the offset by going over a DST, but we want to keep the ts the same
      o = inst.zone.offset(ts);
    }

    return { ts, o };
  }

  // helper useful in turning the results of parsing into real dates
  // by handling the zone options
  function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
    const { setZone, zone } = opts;
    if ((parsed && Object.keys(parsed).length !== 0) || parsedZone) {
      const interpretationZone = parsedZone || zone,
        inst = DateTime.fromObject(parsed, {
          ...opts,
          zone: interpretationZone,
          specificOffset,
        });
      return setZone ? inst : inst.setZone(zone);
    } else {
      return DateTime.invalid(
        new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
      );
    }
  }

  // if you want to output a technical format (e.g. RFC 2822), this helper
  // helps handle the details
  function toTechFormat(dt, format, allowZ = true) {
    return dt.isValid
      ? Formatter.create(Locale.create("en-US"), {
          allowZ,
          forceSimple: true,
        }).formatDateTimeFromString(dt, format)
      : null;
  }

  function toISODate(o, extended) {
    const longFormat = o.c.year > 9999 || o.c.year < 0;
    let c = "";
    if (longFormat && o.c.year >= 0) c += "+";
    c += padStart(o.c.year, longFormat ? 6 : 4);

    if (extended) {
      c += "-";
      c += padStart(o.c.month);
      c += "-";
      c += padStart(o.c.day);
    } else {
      c += padStart(o.c.month);
      c += padStart(o.c.day);
    }
    return c;
  }

  function toISOTime(
    o,
    extended,
    suppressSeconds,
    suppressMilliseconds,
    includeOffset,
    extendedZone
  ) {
    let c = padStart(o.c.hour);
    if (extended) {
      c += ":";
      c += padStart(o.c.minute);
      if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
        c += ":";
      }
    } else {
      c += padStart(o.c.minute);
    }

    if (o.c.millisecond !== 0 || o.c.second !== 0 || !suppressSeconds) {
      c += padStart(o.c.second);

      if (o.c.millisecond !== 0 || !suppressMilliseconds) {
        c += ".";
        c += padStart(o.c.millisecond, 3);
      }
    }

    if (includeOffset) {
      if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
        c += "Z";
      } else if (o.o < 0) {
        c += "-";
        c += padStart(Math.trunc(-o.o / 60));
        c += ":";
        c += padStart(Math.trunc(-o.o % 60));
      } else {
        c += "+";
        c += padStart(Math.trunc(o.o / 60));
        c += ":";
        c += padStart(Math.trunc(o.o % 60));
      }
    }

    if (extendedZone) {
      c += "[" + o.zone.ianaName + "]";
    }
    return c;
  }

  // defaults for unspecified units in the supported calendars
  const defaultUnitValues = {
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    defaultWeekUnitValues = {
      weekNumber: 1,
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    defaultOrdinalUnitValues = {
      ordinal: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };

  // Units in the supported calendars, sorted by bigness
  const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    orderedWeekUnits = [
      "weekYear",
      "weekNumber",
      "weekday",
      "hour",
      "minute",
      "second",
      "millisecond",
    ],
    orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

  // standardize case and plurality in units
  function normalizeUnit(unit) {
    const normalized = {
      year: "year",
      years: "year",
      month: "month",
      months: "month",
      day: "day",
      days: "day",
      hour: "hour",
      hours: "hour",
      minute: "minute",
      minutes: "minute",
      quarter: "quarter",
      quarters: "quarter",
      second: "second",
      seconds: "second",
      millisecond: "millisecond",
      milliseconds: "millisecond",
      weekday: "weekday",
      weekdays: "weekday",
      weeknumber: "weekNumber",
      weeksnumber: "weekNumber",
      weeknumbers: "weekNumber",
      weekyear: "weekYear",
      weekyears: "weekYear",
      ordinal: "ordinal",
    }[unit.toLowerCase()];

    if (!normalized) throw new InvalidUnitError(unit);

    return normalized;
  }

  function normalizeUnitWithLocalWeeks(unit) {
    switch (unit.toLowerCase()) {
      case "localweekday":
      case "localweekdays":
        return "localWeekday";
      case "localweeknumber":
      case "localweeknumbers":
        return "localWeekNumber";
      case "localweekyear":
      case "localweekyears":
        return "localWeekYear";
      default:
        return normalizeUnit(unit);
    }
  }

  // cache offsets for zones based on the current timestamp when this function is
  // first called. When we are handling a datetime from components like (year,
  // month, day, hour) in a time zone, we need a guess about what the timezone
  // offset is so that we can convert into a UTC timestamp. One way is to find the
  // offset of now in the zone. The actual date may have a different offset (for
  // example, if we handle a date in June while we're in December in a zone that
  // observes DST), but we can check and adjust that.
  //
  // When handling many dates, calculating the offset for now every time is
  // expensive. It's just a guess, so we can cache the offset to use even if we
  // are right on a time change boundary (we'll just correct in the other
  // direction). Using a timestamp from first read is a slight optimization for
  // handling dates close to the current date, since those dates will usually be
  // in the same offset (we could set the timestamp statically, instead). We use a
  // single timestamp for all zones to make things a bit more predictable.
  //
  // This is safe for quickDT (used by local() and utc()) because we don't fill in
  // higher-order units from tsNow (as we do in fromObject, this requires that
  // offset is calculated from tsNow).
  /**
   * @param {Zone} zone
   * @return {number}
   */
  function guessOffsetForZone(zone) {
    if (zoneOffsetTs === undefined) {
      zoneOffsetTs = Settings.now();
    }

    // Do not cache anything but IANA zones, because it is not safe to do so.
    // Guessing an offset which is not present in the zone can cause wrong results from fixOffset
    if (zone.type !== "iana") {
      return zone.offset(zoneOffsetTs);
    }
    const zoneName = zone.name;
    let offsetGuess = zoneOffsetGuessCache.get(zoneName);
    if (offsetGuess === undefined) {
      offsetGuess = zone.offset(zoneOffsetTs);
      zoneOffsetGuessCache.set(zoneName, offsetGuess);
    }
    return offsetGuess;
  }

  // this is a dumbed down version of fromObject() that runs about 60% faster
  // but doesn't do any validation, makes a bunch of assumptions about what units
  // are present, and so on.
  function quickDT(obj, opts) {
    const zone = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    }

    const loc = Locale.fromObject(opts);

    let ts, o;

    // assume we have the higher-order units
    if (!isUndefined(obj.year)) {
      for (const u of orderedUnits) {
        if (isUndefined(obj[u])) {
          obj[u] = defaultUnitValues[u];
        }
      }

      const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
      if (invalid) {
        return DateTime.invalid(invalid);
      }

      const offsetProvis = guessOffsetForZone(zone);
      [ts, o] = objToTS(obj, offsetProvis, zone);
    } else {
      ts = Settings.now();
    }

    return new DateTime({ ts, zone, loc, o });
  }

  function diffRelative(start, end, opts) {
    const round = isUndefined(opts.round) ? true : opts.round,
      format = (c, unit) => {
        c = roundTo(c, round || opts.calendary ? 0 : 2, true);
        const formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c, unit);
      },
      differ = (unit) => {
        if (opts.calendary) {
          if (!end.hasSame(start, unit)) {
            return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
          } else return 0;
        } else {
          return end.diff(start, unit).get(unit);
        }
      };

    if (opts.unit) {
      return format(differ(opts.unit), opts.unit);
    }

    for (const unit of opts.units) {
      const count = differ(unit);
      if (Math.abs(count) >= 1) {
        return format(count, unit);
      }
    }
    return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
  }

  function lastOpts(argList) {
    let opts = {},
      args;
    if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
      opts = argList[argList.length - 1];
      args = Array.from(argList).slice(0, argList.length - 1);
    } else {
      args = Array.from(argList);
    }
    return [opts, args];
  }

  /**
   * Timestamp to use for cached zone offset guesses (exposed for test)
   */
  let zoneOffsetTs;
  /**
   * Cache for zone offset guesses (exposed for test).
   *
   * This optimizes quickDT via guessOffsetForZone to avoid repeated calls of
   * zone.offset().
   */
  const zoneOffsetGuessCache = new Map();

  /**
   * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
   *
   * A DateTime comprises of:
   * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
   * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
   * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
   *
   * Here is a brief overview of the most commonly used functionality it provides:
   *
   * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link DateTime.local}, {@link DateTime.utc}, and (most flexibly) {@link DateTime.fromObject}. To create one from a standard string format, use {@link DateTime.fromISO}, {@link DateTime.fromHTTP}, and {@link DateTime.fromRFC2822}. To create one from a custom string format, use {@link DateTime.fromFormat}. To create one from a native JS date, use {@link DateTime.fromJSDate}.
   * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link DateTime#toObject}), use the {@link DateTime#year}, {@link DateTime#month},
   * {@link DateTime#day}, {@link DateTime#hour}, {@link DateTime#minute}, {@link DateTime#second}, {@link DateTime#millisecond} accessors.
   * * **Week calendar**: For ISO week calendar attributes, see the {@link DateTime#weekYear}, {@link DateTime#weekNumber}, and {@link DateTime#weekday} accessors.
   * * **Configuration** See the {@link DateTime#locale} and {@link DateTime#numberingSystem} accessors.
   * * **Transformation**: To transform the DateTime into other DateTimes, use {@link DateTime#set}, {@link DateTime#reconfigure}, {@link DateTime#setZone}, {@link DateTime#setLocale}, {@link DateTime.plus}, {@link DateTime#minus}, {@link DateTime#endOf}, {@link DateTime#startOf}, {@link DateTime#toUTC}, and {@link DateTime#toLocal}.
   * * **Output**: To convert the DateTime to other representations, use the {@link DateTime#toRelative}, {@link DateTime#toRelativeCalendar}, {@link DateTime#toJSON}, {@link DateTime#toISO}, {@link DateTime#toHTTP}, {@link DateTime#toObject}, {@link DateTime#toRFC2822}, {@link DateTime#toString}, {@link DateTime#toLocaleString}, {@link DateTime#toFormat}, {@link DateTime#toMillis} and {@link DateTime#toJSDate}.
   *
   * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
   */
  class DateTime {
    /**
     * @access private
     */
    constructor(config) {
      const zone = config.zone || Settings.defaultZone;

      let invalid =
        config.invalid ||
        (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) ||
        (!zone.isValid ? unsupportedZone(zone) : null);
      /**
       * @access private
       */
      this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;

      let c = null,
        o = null;
      if (!invalid) {
        const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

        if (unchanged) {
          [c, o] = [config.old.c, config.old.o];
        } else {
          // If an offset has been passed and we have not been called from
          // clone(), we can trust it and avoid the offset calculation.
          const ot = isNumber$1(config.o) && !config.old ? config.o : zone.offset(this.ts);
          c = tsToObj(this.ts, ot);
          invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
          c = invalid ? null : c;
          o = invalid ? null : ot;
        }
      }

      /**
       * @access private
       */
      this._zone = zone;
      /**
       * @access private
       */
      this.loc = config.loc || Locale.create();
      /**
       * @access private
       */
      this.invalid = invalid;
      /**
       * @access private
       */
      this.weekData = null;
      /**
       * @access private
       */
      this.localWeekData = null;
      /**
       * @access private
       */
      this.c = c;
      /**
       * @access private
       */
      this.o = o;
      /**
       * @access private
       */
      this.isLuxonDateTime = true;
    }

    // CONSTRUCT

    /**
     * Create a DateTime for the current instant, in the system's time zone.
     *
     * Use Settings to override these default values if needed.
     * @example DateTime.now().toISO() //~> now in the ISO format
     * @return {DateTime}
     */
    static now() {
      return new DateTime({});
    }

    /**
     * Create a local DateTime
     * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month, 1-indexed
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @example DateTime.local()                                  //~> now
     * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
     * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
     * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
     * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
     * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
     * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
     * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
     * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
     * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
     * @return {DateTime}
     */
    static local() {
      const [opts, args] = lastOpts(arguments),
        [year, month, day, hour, minute, second, millisecond] = args;
      return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
    }

    /**
     * Create a DateTime in UTC
     * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
     * @param {number} [month=1] - The month, 1-indexed
     * @param {number} [day=1] - The day of the month
     * @param {number} [hour=0] - The hour of the day, in 24-hour time
     * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
     * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
     * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
     * @param {Object} options - configuration options for the DateTime
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
     * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
     * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
     * @example DateTime.utc()                                              //~> now
     * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
     * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
     * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
     * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
     * @return {DateTime}
     */
    static utc() {
      const [opts, args] = lastOpts(arguments),
        [year, month, day, hour, minute, second, millisecond] = args;

      opts.zone = FixedOffsetZone.utcInstance;
      return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
    }

    /**
     * Create a DateTime from a JavaScript Date object. Uses the default zone.
     * @param {Date} date - a JavaScript Date object
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @return {DateTime}
     */
    static fromJSDate(date, options = {}) {
      const ts = isDate(date) ? date.valueOf() : NaN;
      if (Number.isNaN(ts)) {
        return DateTime.invalid("invalid input");
      }

      const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
      if (!zoneToUse.isValid) {
        return DateTime.invalid(unsupportedZone(zoneToUse));
      }

      return new DateTime({
        ts: ts,
        zone: zoneToUse,
        loc: Locale.fromObject(options),
      });
    }

    /**
     * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} milliseconds - a number of milliseconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromMillis(milliseconds, options = {}) {
      if (!isNumber$1(milliseconds)) {
        throw new InvalidArgumentError(
          `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
        );
      } else if (milliseconds < -864e13 || milliseconds > MAX_DATE) {
        // this isn't perfect because we can still end up out of range because of additional shifting, but it's a start
        return DateTime.invalid("Timestamp out of range");
      } else {
        return new DateTime({
          ts: milliseconds,
          zone: normalizeZone(options.zone, Settings.defaultZone),
          loc: Locale.fromObject(options),
        });
      }
    }

    /**
     * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
     * @param {number} seconds - a number of seconds since 1970 UTC
     * @param {Object} options - configuration options for the DateTime
     * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
     * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
     * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromSeconds(seconds, options = {}) {
      if (!isNumber$1(seconds)) {
        throw new InvalidArgumentError("fromSeconds requires a numerical input");
      } else {
        return new DateTime({
          ts: seconds * 1000,
          zone: normalizeZone(options.zone, Settings.defaultZone),
          loc: Locale.fromObject(options),
        });
      }
    }

    /**
     * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
     * @param {Object} obj - the object to create the DateTime from
     * @param {number} obj.year - a year, such as 1987
     * @param {number} obj.month - a month, 1-12
     * @param {number} obj.day - a day of the month, 1-31, depending on the month
     * @param {number} obj.ordinal - day of the year, 1-365 or 366
     * @param {number} obj.weekYear - an ISO week year
     * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
     * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
     * @param {number} obj.localWeekYear - a week year, according to the locale
     * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
     * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
     * @param {number} obj.hour - hour of the day, 0-23
     * @param {number} obj.minute - minute of the hour, 0-59
     * @param {number} obj.second - second of the minute, 0-59
     * @param {number} obj.millisecond - millisecond of the second, 0-999
     * @param {Object} opts - options for creating this DateTime
     * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
     * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
     * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
     * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
     * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
     * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
     * @return {DateTime}
     */
    static fromObject(obj, opts = {}) {
      obj = obj || {};
      const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
      if (!zoneToUse.isValid) {
        return DateTime.invalid(unsupportedZone(zoneToUse));
      }

      const loc = Locale.fromObject(opts);
      const normalized = normalizeObject(obj, normalizeUnitWithLocalWeeks);
      const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, loc);

      const tsNow = Settings.now(),
        offsetProvis = !isUndefined(opts.specificOffset)
          ? opts.specificOffset
          : zoneToUse.offset(tsNow),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber;

      // cases:
      // just a weekday -> this week's instance of that weekday, no worries
      // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
      // (gregorian month or day) + ordinal -> error
      // otherwise just use weeks or ordinals or gregorian, depending on what's specified

      if ((containsGregor || containsOrdinal) && definiteWeekDef) {
        throw new ConflictingSpecificationError(
          "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
        );
      }

      if (containsGregorMD && containsOrdinal) {
        throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
      }

      const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);

      // configure ourselves to deal with gregorian dates or week stuff
      let units,
        defaultValues,
        objNow = tsToObj(tsNow, offsetProvis);
      if (useWeekData) {
        units = orderedWeekUnits;
        defaultValues = defaultWeekUnitValues;
        objNow = gregorianToWeek(objNow, minDaysInFirstWeek, startOfWeek);
      } else if (containsOrdinal) {
        units = orderedOrdinalUnits;
        defaultValues = defaultOrdinalUnitValues;
        objNow = gregorianToOrdinal(objNow);
      } else {
        units = orderedUnits;
        defaultValues = defaultUnitValues;
      }

      // set default values for missing stuff
      let foundFirst = false;
      for (const u of units) {
        const v = normalized[u];
        if (!isUndefined(v)) {
          foundFirst = true;
        } else if (foundFirst) {
          normalized[u] = defaultValues[u];
        } else {
          normalized[u] = objNow[u];
        }
      }

      // make sure the values we have are in range
      const higherOrderInvalid = useWeekData
          ? hasInvalidWeekData(normalized, minDaysInFirstWeek, startOfWeek)
          : containsOrdinal
          ? hasInvalidOrdinalData(normalized)
          : hasInvalidGregorianData(normalized),
        invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

      if (invalid) {
        return DateTime.invalid(invalid);
      }

      // compute the actual time
      const gregorian = useWeekData
          ? weekToGregorian(normalized, minDaysInFirstWeek, startOfWeek)
          : containsOrdinal
          ? ordinalToGregorian(normalized)
          : normalized,
        [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
        inst = new DateTime({
          ts: tsFinal,
          zone: zoneToUse,
          o: offsetFinal,
          loc,
        });

      // gregorian data + weekday serves only to validate
      if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
        return DateTime.invalid(
          "mismatched weekday",
          `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
        );
      }

      if (!inst.isValid) {
        return DateTime.invalid(inst.invalid);
      }

      return inst;
    }

    /**
     * Create a DateTime from an ISO 8601 string
     * @param {string} text - the ISO string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
     * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
     * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromISO('2016-05-25T09:08:34.123')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
     * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
     * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
     * @example DateTime.fromISO('2016-W05-4')
     * @return {DateTime}
     */
    static fromISO(text, opts = {}) {
      const [vals, parsedZone] = parseISODate(text);
      return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
    }

    /**
     * Create a DateTime from an RFC 2822 string
     * @param {string} text - the RFC 2822 string
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
     * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
     * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
     * @return {DateTime}
     */
    static fromRFC2822(text, opts = {}) {
      const [vals, parsedZone] = parseRFC2822Date(text);
      return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
    }

    /**
     * Create a DateTime from an HTTP header date
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @param {string} text - the HTTP header date
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
     * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
     * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
     * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
     * @return {DateTime}
     */
    static fromHTTP(text, opts = {}) {
      const [vals, parsedZone] = parseHTTPDate(text);
      return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
    }

    /**
     * Create a DateTime from an input string and format string.
     * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @return {DateTime}
     */
    static fromFormat(text, fmt, opts = {}) {
      if (isUndefined(text) || isUndefined(fmt)) {
        throw new InvalidArgumentError("fromFormat requires an input string and a format");
      }

      const { locale = null, numberingSystem = null } = opts,
        localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true,
        }),
        [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
      if (invalid) {
        return DateTime.invalid(invalid);
      } else {
        return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
      }
    }

    /**
     * @deprecated use fromFormat instead
     */
    static fromString(text, fmt, opts = {}) {
      return DateTime.fromFormat(text, fmt, opts);
    }

    /**
     * Create a DateTime from a SQL date, time, or datetime
     * Defaults to en-US if no locale has been specified, regardless of the system's locale
     * @param {string} text - the string to parse
     * @param {Object} opts - options to affect the creation
     * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
     * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
     * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
     * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
     * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
     * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
     * @example DateTime.fromSQL('2017-05-15')
     * @example DateTime.fromSQL('2017-05-15 09:12:34')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
     * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
     * @example DateTime.fromSQL('09:12:34.342')
     * @return {DateTime}
     */
    static fromSQL(text, opts = {}) {
      const [vals, parsedZone] = parseSQL(text);
      return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
    }

    /**
     * Create an invalid DateTime.
     * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
     * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
     * @return {DateTime}
     */
    static invalid(reason, explanation = null) {
      if (!reason) {
        throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
      }

      const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

      if (Settings.throwOnInvalid) {
        throw new InvalidDateTimeError(invalid);
      } else {
        return new DateTime({ invalid });
      }
    }

    /**
     * Check if an object is an instance of DateTime. Works across context boundaries
     * @param {object} o
     * @return {boolean}
     */
    static isDateTime(o) {
      return (o && o.isLuxonDateTime) || false;
    }

    /**
     * Produce the format string for a set of options
     * @param formatOpts
     * @param localeOpts
     * @returns {string}
     */
    static parseFormatForOpts(formatOpts, localeOpts = {}) {
      const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
      return !tokenList ? null : tokenList.map((t) => (t ? t.val : null)).join("");
    }

    /**
     * Produce the the fully expanded format token for the locale
     * Does NOT quote characters, so quoted tokens will not round trip correctly
     * @param fmt
     * @param localeOpts
     * @returns {string}
     */
    static expandFormat(fmt, localeOpts = {}) {
      const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
      return expanded.map((t) => t.val).join("");
    }

    static resetCache() {
      zoneOffsetTs = undefined;
      zoneOffsetGuessCache.clear();
    }

    // INFO

    /**
     * Get the value of unit.
     * @param {string} unit - a unit such as 'minute' or 'day'
     * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
     * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
     * @return {number}
     */
    get(unit) {
      return this[unit];
    }

    /**
     * Returns whether the DateTime is valid. Invalid DateTimes occur when:
     * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
     * * The DateTime was created by an operation on another invalid date
     * @type {boolean}
     */
    get isValid() {
      return this.invalid === null;
    }

    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidReason() {
      return this.invalid ? this.invalid.reason : null;
    }

    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */
    get invalidExplanation() {
      return this.invalid ? this.invalid.explanation : null;
    }

    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */
    get locale() {
      return this.isValid ? this.loc.locale : null;
    }

    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */
    get numberingSystem() {
      return this.isValid ? this.loc.numberingSystem : null;
    }

    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */
    get outputCalendar() {
      return this.isValid ? this.loc.outputCalendar : null;
    }

    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */
    get zone() {
      return this._zone;
    }

    /**
     * Get the name of the time zone.
     * @type {string}
     */
    get zoneName() {
      return this.isValid ? this.zone.name : null;
    }

    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */
    get year() {
      return this.isValid ? this.c.year : NaN;
    }

    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */
    get quarter() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }

    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */
    get month() {
      return this.isValid ? this.c.month : NaN;
    }

    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */
    get day() {
      return this.isValid ? this.c.day : NaN;
    }

    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */
    get hour() {
      return this.isValid ? this.c.hour : NaN;
    }

    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */
    get minute() {
      return this.isValid ? this.c.minute : NaN;
    }

    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */
    get second() {
      return this.isValid ? this.c.second : NaN;
    }

    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */
    get millisecond() {
      return this.isValid ? this.c.millisecond : NaN;
    }

    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
     * @type {number}
     */
    get weekYear() {
      return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }

    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */
    get weekNumber() {
      return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }

    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */
    get weekday() {
      return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }

    /**
     * Returns true if this date is on a weekend according to the locale, false otherwise
     * @returns {boolean}
     */
    get isWeekend() {
      return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
    }

    /**
     * Get the day of the week according to the locale.
     * 1 is the first day of the week and 7 is the last day of the week.
     * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
     * @returns {number}
     */
    get localWeekday() {
      return this.isValid ? possiblyCachedLocalWeekData(this).weekday : NaN;
    }

    /**
     * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
     * because the week can start on different days of the week (see localWeekday) and because a different number of days
     * is required for a week to count as the first week of a year.
     * @returns {number}
     */
    get localWeekNumber() {
      return this.isValid ? possiblyCachedLocalWeekData(this).weekNumber : NaN;
    }

    /**
     * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
     * differently, see localWeekNumber.
     * @returns {number}
     */
    get localWeekYear() {
      return this.isValid ? possiblyCachedLocalWeekData(this).weekYear : NaN;
    }

    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */
    get ordinal() {
      return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }

    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */
    get monthShort() {
      return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
    }

    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */
    get monthLong() {
      return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
    }

    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */
    get weekdayShort() {
      return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
    }

    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */
    get weekdayLong() {
      return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
    }

    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.now().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */
    get offset() {
      return this.isValid ? +this.o : NaN;
    }

    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameShort() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "short",
          locale: this.locale,
        });
      } else {
        return null;
      }
    }

    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */
    get offsetNameLong() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "long",
          locale: this.locale,
        });
      } else {
        return null;
      }
    }

    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */
    get isOffsetFixed() {
      return this.isValid ? this.zone.isUniversal : null;
    }

    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */
    get isInDST() {
      if (this.isOffsetFixed) {
        return false;
      } else {
        return (
          this.offset > this.set({ month: 1, day: 1 }).offset ||
          this.offset > this.set({ month: 5 }).offset
        );
      }
    }

    /**
     * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
     * in this DateTime's zone. During DST changes local time can be ambiguous, for example
     * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
     * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
     * @returns {DateTime[]}
     */
    getPossibleOffsets() {
      if (!this.isValid || this.isOffsetFixed) {
        return [this];
      }
      const dayMs = 86400000;
      const minuteMs = 60000;
      const localTS = objToLocalTS(this.c);
      const oEarlier = this.zone.offset(localTS - dayMs);
      const oLater = this.zone.offset(localTS + dayMs);

      const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
      const o2 = this.zone.offset(localTS - oLater * minuteMs);
      if (o1 === o2) {
        return [this];
      }
      const ts1 = localTS - o1 * minuteMs;
      const ts2 = localTS - o2 * minuteMs;
      const c1 = tsToObj(ts1, o1);
      const c2 = tsToObj(ts2, o2);
      if (
        c1.hour === c2.hour &&
        c1.minute === c2.minute &&
        c1.second === c2.second &&
        c1.millisecond === c2.millisecond
      ) {
        return [clone$2(this, { ts: ts1 }), clone$2(this, { ts: ts2 })];
      }
      return [this];
    }

    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */
    get isInLeapYear() {
      return isLeapYear(this.year);
    }

    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */
    get daysInMonth() {
      return daysInMonth(this.year, this.month);
    }

    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */
    get daysInYear() {
      return this.isValid ? daysInYear(this.year) : NaN;
    }

    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */
    get weeksInWeekYear() {
      return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }

    /**
     * Returns the number of weeks in this DateTime's local week year
     * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
     * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
     * @type {number}
     */
    get weeksInLocalWeekYear() {
      return this.isValid
        ? weeksInWeekYear(
            this.localWeekYear,
            this.loc.getMinDaysInFirstWeek(),
            this.loc.getStartOfWeek()
          )
        : NaN;
    }

    /**
     * Returns the resolved Intl options for this DateTime.
     * This is useful in understanding the behavior of formatting methods
     * @param {Object} opts - the same options as toLocaleString
     * @return {Object}
     */
    resolvedLocaleOptions(opts = {}) {
      const { locale, numberingSystem, calendar } = Formatter.create(
        this.loc.clone(opts),
        opts
      ).resolvedOptions(this);
      return { locale, numberingSystem, outputCalendar: calendar };
    }

    // TRANSFORM

    /**
     * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
     *
     * Equivalent to {@link DateTime#setZone}('utc')
     * @param {number} [offset=0] - optionally, an offset from UTC in minutes
     * @param {Object} [opts={}] - options to pass to `setZone()`
     * @return {DateTime}
     */
    toUTC(offset = 0, opts = {}) {
      return this.setZone(FixedOffsetZone.instance(offset), opts);
    }

    /**
     * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
     *
     * Equivalent to `setZone('local')`
     * @return {DateTime}
     */
    toLocal() {
      return this.setZone(Settings.defaultZone);
    }

    /**
     * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
     *
     * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
     * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
     * @param {Object} opts - options
     * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
     * @return {DateTime}
     */
    setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
      zone = normalizeZone(zone, Settings.defaultZone);
      if (zone.equals(this.zone)) {
        return this;
      } else if (!zone.isValid) {
        return DateTime.invalid(unsupportedZone(zone));
      } else {
        let newTS = this.ts;
        if (keepLocalTime || keepCalendarTime) {
          const offsetGuess = zone.offset(this.ts);
          const asObj = this.toObject();
          [newTS] = objToTS(asObj, offsetGuess, zone);
        }
        return clone$2(this, { ts: newTS, zone });
      }
    }

    /**
     * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
     * @param {Object} properties - the properties to set
     * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
     * @return {DateTime}
     */
    reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
      const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
      return clone$2(this, { loc });
    }

    /**
     * "Set" the locale. Returns a newly-constructed DateTime.
     * Just a convenient alias for reconfigure({ locale })
     * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
     * @return {DateTime}
     */
    setLocale(locale) {
      return this.reconfigure({ locale });
    }

    /**
     * "Set" the values of specified units. Returns a newly-constructed DateTime.
     * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
     *
     * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
     * They cannot be mixed with ISO-week units like `weekday`.
     * @param {Object} values - a mapping of units to numbers
     * @example dt.set({ year: 2017 })
     * @example dt.set({ hour: 8, minute: 30 })
     * @example dt.set({ weekday: 5 })
     * @example dt.set({ year: 2005, ordinal: 234 })
     * @return {DateTime}
     */
    set(values) {
      if (!this.isValid) return this;

      const normalized = normalizeObject(values, normalizeUnitWithLocalWeeks);
      const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, this.loc);

      const settingWeekStuff =
          !isUndefined(normalized.weekYear) ||
          !isUndefined(normalized.weekNumber) ||
          !isUndefined(normalized.weekday),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber;

      if ((containsGregor || containsOrdinal) && definiteWeekDef) {
        throw new ConflictingSpecificationError(
          "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
        );
      }

      if (containsGregorMD && containsOrdinal) {
        throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
      }

      let mixed;
      if (settingWeekStuff) {
        mixed = weekToGregorian(
          { ...gregorianToWeek(this.c, minDaysInFirstWeek, startOfWeek), ...normalized },
          minDaysInFirstWeek,
          startOfWeek
        );
      } else if (!isUndefined(normalized.ordinal)) {
        mixed = ordinalToGregorian({ ...gregorianToOrdinal(this.c), ...normalized });
      } else {
        mixed = { ...this.toObject(), ...normalized };

        // if we didn't set the day but we ended up on an overflow date,
        // use the last day of the right month
        if (isUndefined(normalized.day)) {
          mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
        }
      }

      const [ts, o] = objToTS(mixed, this.o, this.zone);
      return clone$2(this, { ts, o });
    }

    /**
     * Add a period of time to this DateTime and return the resulting DateTime
     *
     * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
     * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     * @example DateTime.now().plus(123) //~> in 123 milliseconds
     * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
     * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
     * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
     * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
     * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
     * @return {DateTime}
     */
    plus(duration) {
      if (!this.isValid) return this;
      const dur = Duration.fromDurationLike(duration);
      return clone$2(this, adjustTime(this, dur));
    }

    /**
     * Subtract a period of time to this DateTime and return the resulting DateTime
     * See {@link DateTime#plus}
     * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
     @return {DateTime}
     */
    minus(duration) {
      if (!this.isValid) return this;
      const dur = Duration.fromDurationLike(duration).negate();
      return clone$2(this, adjustTime(this, dur));
    }

    /**
     * "Set" this DateTime to the beginning of a unit of time.
     * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
     * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
     * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
     * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
     * @return {DateTime}
     */
    startOf(unit, { useLocaleWeeks = false } = {}) {
      if (!this.isValid) return this;

      const o = {},
        normalizedUnit = Duration.normalizeUnit(unit);
      switch (normalizedUnit) {
        case "years":
          o.month = 1;
        // falls through
        case "quarters":
        case "months":
          o.day = 1;
        // falls through
        case "weeks":
        case "days":
          o.hour = 0;
        // falls through
        case "hours":
          o.minute = 0;
        // falls through
        case "minutes":
          o.second = 0;
        // falls through
        case "seconds":
          o.millisecond = 0;
          break;
        // no default, invalid units throw in normalizeUnit()
      }

      if (normalizedUnit === "weeks") {
        if (useLocaleWeeks) {
          const startOfWeek = this.loc.getStartOfWeek();
          const { weekday } = this;
          if (weekday < startOfWeek) {
            o.weekNumber = this.weekNumber - 1;
          }
          o.weekday = startOfWeek;
        } else {
          o.weekday = 1;
        }
      }

      if (normalizedUnit === "quarters") {
        const q = Math.ceil(this.month / 3);
        o.month = (q - 1) * 3 + 1;
      }

      return this.set(o);
    }

    /**
     * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
     * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
     * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
     * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
     * @return {DateTime}
     */
    endOf(unit, opts) {
      return this.isValid
        ? this.plus({ [unit]: 1 })
            .startOf(unit, opts)
            .minus(1)
        : this;
    }

    // OUTPUT

    /**
     * Returns a string representation of this DateTime formatted according to the specified format string.
     * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
     * Defaults to en-US if no locale has been specified, regardless of the system's locale.
     * @param {string} fmt - the format string
     * @param {Object} opts - opts to override the configuration options on this DateTime
     * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
     * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
     * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
     * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
     * @return {string}
     */
    toFormat(fmt, opts = {}) {
      return this.isValid
        ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
        : INVALID;
    }

    /**
     * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
     * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
     * of the DateTime in the assigned locale.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
     * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
     * @param {Object} opts - opts to override the configuration options on this DateTime
     * @example DateTime.now().toLocaleString(); //=> 4/20/2017
     * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
     * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
     * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
     * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
     * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
     * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
     * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
     * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
     * @return {string}
     */
    toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
      return this.isValid
        ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this)
        : INVALID;
    }

    /**
     * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
     * Defaults to the system's locale if no locale has been specified
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
     * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
     * @example DateTime.now().toLocaleParts(); //=> [
     *                                   //=>   { type: 'day', value: '25' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'month', value: '05' },
     *                                   //=>   { type: 'literal', value: '/' },
     *                                   //=>   { type: 'year', value: '1982' }
     *                                   //=> ]
     */
    toLocaleParts(opts = {}) {
      return this.isValid
        ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
        : [];
    }

    /**
     * Returns an ISO 8601-compliant string representation of this DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
     * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
     * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
     * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
     * @return {string|null}
     */
    toISO({
      format = "extended",
      suppressSeconds = false,
      suppressMilliseconds = false,
      includeOffset = true,
      extendedZone = false,
    } = {}) {
      if (!this.isValid) {
        return null;
      }

      const ext = format === "extended";

      let c = toISODate(this, ext);
      c += "T";
      c += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
      return c;
    }

    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's date component
     * @param {Object} opts - options
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
     * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
     * @return {string|null}
     */
    toISODate({ format = "extended" } = {}) {
      if (!this.isValid) {
        return null;
      }

      return toISODate(this, format === "extended");
    }

    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's week date
     * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
     * @return {string}
     */
    toISOWeekDate() {
      return toTechFormat(this, "kkkk-'W'WW-c");
    }

    /**
     * Returns an ISO 8601-compliant string representation of this DateTime's time component
     * @param {Object} opts - options
     * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
     * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
     * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
     * @param {string} [opts.format='extended'] - choose between the basic and extended format
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
     * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
     * @return {string}
     */
    toISOTime({
      suppressMilliseconds = false,
      suppressSeconds = false,
      includeOffset = true,
      includePrefix = false,
      extendedZone = false,
      format = "extended",
    } = {}) {
      if (!this.isValid) {
        return null;
      }

      let c = includePrefix ? "T" : "";
      return (
        c +
        toISOTime(
          this,
          format === "extended",
          suppressSeconds,
          suppressMilliseconds,
          includeOffset,
          extendedZone
        )
      );
    }

    /**
     * Returns an RFC 2822-compatible string representation of this DateTime
     * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
     * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
     * @return {string}
     */
    toRFC2822() {
      return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
    }

    /**
     * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
     * Specifically, the string conforms to RFC 1123.
     * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
     * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
     * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
     * @return {string}
     */
    toHTTP() {
      return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }

    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Date
     * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
     * @return {string|null}
     */
    toSQLDate() {
      if (!this.isValid) {
        return null;
      }
      return toISODate(this, true);
    }

    /**
     * Returns a string representation of this DateTime appropriate for use in SQL Time
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
     * @example DateTime.utc().toSQL() //=> '05:15:16.345'
     * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
     * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
     * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
     * @return {string}
     */
    toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
      let fmt = "HH:mm:ss.SSS";

      if (includeZone || includeOffset) {
        if (includeOffsetSpace) {
          fmt += " ";
        }
        if (includeZone) {
          fmt += "z";
        } else if (includeOffset) {
          fmt += "ZZ";
        }
      }

      return toTechFormat(this, fmt, true);
    }

    /**
     * Returns a string representation of this DateTime appropriate for use in SQL DateTime
     * @param {Object} opts - options
     * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
     * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
     * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
     * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
     * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
     * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
     * @return {string}
     */
    toSQL(opts = {}) {
      if (!this.isValid) {
        return null;
      }

      return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
    }

    /**
     * Returns a string representation of this DateTime appropriate for debugging
     * @return {string}
     */
    toString() {
      return this.isValid ? this.toISO() : INVALID;
    }

    /**
     * Returns a string representation of this DateTime appropriate for the REPL.
     * @return {string}
     */
    [Symbol.for("nodejs.util.inspect.custom")]() {
      if (this.isValid) {
        return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
      } else {
        return `DateTime { Invalid, reason: ${this.invalidReason} }`;
      }
    }

    /**
     * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
     * @return {number}
     */
    valueOf() {
      return this.toMillis();
    }

    /**
     * Returns the epoch milliseconds of this DateTime.
     * @return {number}
     */
    toMillis() {
      return this.isValid ? this.ts : NaN;
    }

    /**
     * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
     * @return {number}
     */
    toSeconds() {
      return this.isValid ? this.ts / 1000 : NaN;
    }

    /**
     * Returns the epoch seconds (as a whole number) of this DateTime.
     * @return {number}
     */
    toUnixInteger() {
      return this.isValid ? Math.floor(this.ts / 1000) : NaN;
    }

    /**
     * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
     * @return {string}
     */
    toJSON() {
      return this.toISO();
    }

    /**
     * Returns a BSON serializable equivalent to this DateTime.
     * @return {Date}
     */
    toBSON() {
      return this.toJSDate();
    }

    /**
     * Returns a JavaScript object with this DateTime's year, month, day, and so on.
     * @param opts - options for generating the object
     * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
     * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
     * @return {Object}
     */
    toObject(opts = {}) {
      if (!this.isValid) return {};

      const base = { ...this.c };

      if (opts.includeConfig) {
        base.outputCalendar = this.outputCalendar;
        base.numberingSystem = this.loc.numberingSystem;
        base.locale = this.loc.locale;
      }
      return base;
    }

    /**
     * Returns a JavaScript Date equivalent to this DateTime.
     * @return {Date}
     */
    toJSDate() {
      return new Date(this.isValid ? this.ts : NaN);
    }

    // COMPARE

    /**
     * Return the difference between two DateTimes as a Duration.
     * @param {DateTime} otherDateTime - the DateTime to compare this one to
     * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @example
     * var i1 = DateTime.fromISO('1982-05-25T09:45'),
     *     i2 = DateTime.fromISO('1983-10-14T10:30');
     * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
     * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
     * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
     * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
     * @return {Duration}
     */
    diff(otherDateTime, unit = "milliseconds", opts = {}) {
      if (!this.isValid || !otherDateTime.isValid) {
        return Duration.invalid("created by diffing an invalid DateTime");
      }

      const durOpts = { locale: this.locale, numberingSystem: this.numberingSystem, ...opts };

      const units = maybeArray(unit).map(Duration.normalizeUnit),
        otherIsLater = otherDateTime.valueOf() > this.valueOf(),
        earlier = otherIsLater ? this : otherDateTime,
        later = otherIsLater ? otherDateTime : this,
        diffed = diff(earlier, later, units, durOpts);

      return otherIsLater ? diffed.negate() : diffed;
    }

    /**
     * Return the difference between this DateTime and right now.
     * See {@link DateTime#diff}
     * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
     * @param {Object} opts - options that affect the creation of the Duration
     * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
     * @return {Duration}
     */
    diffNow(unit = "milliseconds", opts = {}) {
      return this.diff(DateTime.now(), unit, opts);
    }

    /**
     * Return an Interval spanning between this DateTime and another DateTime
     * @param {DateTime} otherDateTime - the other end point of the Interval
     * @return {Interval|DateTime}
     */
    until(otherDateTime) {
      return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
    }

    /**
     * Return whether this DateTime is in the same unit of time as another DateTime.
     * Higher-order units must also be identical for this function to return `true`.
     * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
     * @param {DateTime} otherDateTime - the other DateTime
     * @param {string} unit - the unit of time to check sameness on
     * @param {Object} opts - options
     * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
     * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
     * @return {boolean}
     */
    hasSame(otherDateTime, unit, opts) {
      if (!this.isValid) return false;

      const inputMs = otherDateTime.valueOf();
      const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
      return (
        adjustedToZone.startOf(unit, opts) <= inputMs && inputMs <= adjustedToZone.endOf(unit, opts)
      );
    }

    /**
     * Equality check
     * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
     * To compare just the millisecond values, use `+dt1 === +dt2`.
     * @param {DateTime} other - the other DateTime
     * @return {boolean}
     */
    equals(other) {
      return (
        this.isValid &&
        other.isValid &&
        this.valueOf() === other.valueOf() &&
        this.zone.equals(other.zone) &&
        this.loc.equals(other.loc)
      );
    }

    /**
     * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
     * platform supports Intl.RelativeTimeFormat. Rounds down by default.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
     * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
     * @param {boolean} [options.round=true] - whether to round the numbers in the output.
     * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
     * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
     * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
     * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
     * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
     * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
     */
    toRelative(options = {}) {
      if (!this.isValid) return null;
      const base = options.base || DateTime.fromObject({}, { zone: this.zone }),
        padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
      let units = ["years", "months", "days", "hours", "minutes", "seconds"];
      let unit = options.unit;
      if (Array.isArray(options.unit)) {
        units = options.unit;
        unit = undefined;
      }
      return diffRelative(base, this.plus(padding), {
        ...options,
        numeric: "always",
        units,
        unit,
      });
    }

    /**
     * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
     * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
     * @param {Object} options - options that affect the output
     * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
     * @param {string} options.locale - override the locale of this DateTime
     * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
     * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
     * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
     * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
     * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
     * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
     */
    toRelativeCalendar(options = {}) {
      if (!this.isValid) return null;

      return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, {
        ...options,
        numeric: "auto",
        units: ["years", "months", "days"],
        calendary: true,
      });
    }

    /**
     * Return the min of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
     * @return {DateTime} the min DateTime, or undefined if called with no argument
     */
    static min(...dateTimes) {
      if (!dateTimes.every(DateTime.isDateTime)) {
        throw new InvalidArgumentError("min requires all arguments be DateTimes");
      }
      return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
    }

    /**
     * Return the max of several date times
     * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
     * @return {DateTime} the max DateTime, or undefined if called with no argument
     */
    static max(...dateTimes) {
      if (!dateTimes.every(DateTime.isDateTime)) {
        throw new InvalidArgumentError("max requires all arguments be DateTimes");
      }
      return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
    }

    // MISC

    /**
     * Explain how a string would be parsed by fromFormat()
     * @param {string} text - the string to parse
     * @param {string} fmt - the format the string is expected to be in (see description)
     * @param {Object} options - options taken by fromFormat()
     * @return {Object}
     */
    static fromFormatExplain(text, fmt, options = {}) {
      const { locale = null, numberingSystem = null } = options,
        localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true,
        });
      return explainFromTokens(localeToUse, text, fmt);
    }

    /**
     * @deprecated use fromFormatExplain instead
     */
    static fromStringExplain(text, fmt, options = {}) {
      return DateTime.fromFormatExplain(text, fmt, options);
    }

    /**
     * Build a parser for `fmt` using the given locale. This parser can be passed
     * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
     * can be used to optimize cases where many dates need to be parsed in a
     * specific format.
     *
     * @param {String} fmt - the format the string is expected to be in (see
     * description)
     * @param {Object} options - options used to set locale and numberingSystem
     * for parser
     * @returns {TokenParser} - opaque object to be used
     */
    static buildFormatParser(fmt, options = {}) {
      const { locale = null, numberingSystem = null } = options,
        localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true,
        });
      return new TokenParser(localeToUse, fmt);
    }

    /**
     * Create a DateTime from an input string and format parser.
     *
     * The format parser must have been created with the same locale as this call.
     *
     * @param {String} text - the string to parse
     * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
     * @param {Object} opts - options taken by fromFormat()
     * @returns {DateTime}
     */
    static fromFormatParser(text, formatParser, opts = {}) {
      if (isUndefined(text) || isUndefined(formatParser)) {
        throw new InvalidArgumentError(
          "fromFormatParser requires an input string and a format parser"
        );
      }
      const { locale = null, numberingSystem = null } = opts,
        localeToUse = Locale.fromOpts({
          locale,
          numberingSystem,
          defaultToEN: true,
        });

      if (!localeToUse.equals(formatParser.locale)) {
        throw new InvalidArgumentError(
          `fromFormatParser called with a locale of ${localeToUse}, ` +
            `but the format parser was created for ${formatParser.locale}`
        );
      }

      const { result, zone, specificOffset, invalidReason } = formatParser.explainFromTokens(text);

      if (invalidReason) {
        return DateTime.invalid(invalidReason);
      } else {
        return parseDataToDateTime(
          result,
          zone,
          opts,
          `format ${formatParser.format}`,
          text,
          specificOffset
        );
      }
    }

    // FORMAT PRESETS

    /**
     * {@link DateTime#toLocaleString} format like 10/14/1983
     * @type {Object}
     */
    static get DATE_SHORT() {
      return DATE_SHORT;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED() {
      return DATE_MED;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
     * @type {Object}
     */
    static get DATE_MED_WITH_WEEKDAY() {
      return DATE_MED_WITH_WEEKDAY;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */
    static get DATE_FULL() {
      return DATE_FULL;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */
    static get DATE_HUGE() {
      return DATE_HUGE;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_SIMPLE() {
      return TIME_SIMPLE;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SECONDS() {
      return TIME_WITH_SECONDS;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_SHORT_OFFSET() {
      return TIME_WITH_SHORT_OFFSET;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get TIME_WITH_LONG_OFFSET() {
      return TIME_WITH_LONG_OFFSET;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_SIMPLE() {
      return TIME_24_SIMPLE;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SECONDS() {
      return TIME_24_WITH_SECONDS;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_SHORT_OFFSET() {
      return TIME_24_WITH_SHORT_OFFSET;
    }

    /**
     * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */
    static get TIME_24_WITH_LONG_OFFSET() {
      return TIME_24_WITH_LONG_OFFSET;
    }

    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT() {
      return DATETIME_SHORT;
    }

    /**
     * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_SHORT_WITH_SECONDS() {
      return DATETIME_SHORT_WITH_SECONDS;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED() {
      return DATETIME_MED;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_SECONDS() {
      return DATETIME_MED_WITH_SECONDS;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_MED_WITH_WEEKDAY() {
      return DATETIME_MED_WITH_WEEKDAY;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL() {
      return DATETIME_FULL;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_FULL_WITH_SECONDS() {
      return DATETIME_FULL_WITH_SECONDS;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE() {
      return DATETIME_HUGE;
    }

    /**
     * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */
    static get DATETIME_HUGE_WITH_SECONDS() {
      return DATETIME_HUGE_WITH_SECONDS;
    }
  }

  /**
   * @private
   */
  function friendlyDateTime(dateTimeish) {
    if (DateTime.isDateTime(dateTimeish)) {
      return dateTimeish;
    } else if (dateTimeish && dateTimeish.valueOf && isNumber$1(dateTimeish.valueOf())) {
      return DateTime.fromJSDate(dateTimeish);
    } else if (dateTimeish && typeof dateTimeish === "object") {
      return DateTime.fromObject(dateTimeish);
    } else {
      throw new InvalidArgumentError(
        `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
      );
    }
  }

  function waitForElm(selector) {
      return new Promise(resolve => {
          if (document.querySelector(selector)) {
              return resolve(document.querySelector(selector));
          }
          const observer = new MutationObserver(mutations => {
              if (document.querySelector(selector)) {
                  resolve(document.querySelector(selector));
                  observer.disconnect();
              }
          });
          observer.observe(document.body, {
              childList: true,
              subtree: true
          });
      });
  }

  function abs(duration) {
      if (duration.toMillis() < 0)
          return Duration.fromMillis(-duration.toMillis());
      return duration;
  }

  class TimeRange {
      begin;
      end;
      constructor(begin, end) {
          this.begin = begin;
          this.end = end;
      }
      get diff() {
          return this.begin != undefined && this.end != undefined
              ? this.end.diff(this.begin)
              : undefined;
      }
      static compare(leftRange, rightRange) {
          if (leftRange.begin !== undefined && rightRange.begin !== undefined) {
              return Math.sign(leftRange.begin.diff(rightRange.begin).toMillis());
          }
          if (leftRange.begin === undefined && rightRange.begin !== undefined) {
              return 1;
          }
          if (leftRange.begin !== undefined && rightRange.begin === undefined) {
              return -1;
          }
          if (leftRange.begin === undefined && rightRange.begin === undefined) {
              if (leftRange.end === undefined)
                  return 1;
              if (rightRange.end === undefined)
                  return -1;
              if (leftRange.end === undefined && rightRange.end === undefined)
                  return 0;
              return Math.sign(leftRange.end.diff(rightRange.end).toMillis());
          }
          return 0;
      }
      /**
       * Проверка двух диапазонов на пересечение
       */
      static RangeCollision(left, right) {
          if (left === undefined || right === undefined)
              return false;
          if ((left.begin === undefined && left.end === undefined) ||
              (right.begin === undefined && right.end === undefined))
              return true;
          if ((left.begin === undefined && right.begin === undefined) ||
              (left.end === undefined && right.end === undefined))
              return true;
          if (left.begin === undefined &&
              right.end === undefined &&
              left.end !== undefined &&
              right.begin !== undefined)
              return left.end.diff(right.begin).toMillis() >= 0;
          if (right.begin === undefined &&
              left.end === undefined &&
              right.end !== undefined &&
              left.begin !== undefined)
              return right.end.diff(left.begin).toMillis() >= 0;
          if (left.begin !== undefined &&
              right.end !== undefined &&
              right.begin !== undefined &&
              left.end !== undefined) {
              return ((left.end.diff(right.begin).toMillis() >= 0 &&
                  left.begin.diff(right.end).toMillis() < 0) ||
                  (right.end.diff(left.begin).toMillis() >= 0 &&
                      right.begin.diff(left.end).toMillis() < 0));
          }
          return false;
      }
      /**
       * Объединение двух диапазонов
       */
      static Merge(left, right) {
          var range = new TimeRange();
          if (left === undefined && right === undefined)
              return range;
          if (left === undefined && right !== undefined)
              return right;
          if (right === undefined && left !== undefined)
              return left;
          if (left.begin === undefined && right.begin !== undefined)
              range.begin = right.begin;
          if (right.begin === undefined && left.begin !== undefined)
              range.begin = left.begin;
          if (right.begin !== undefined && left.begin !== undefined)
              range.begin =
                  left.begin.diff(right.begin).toMillis() < 0 ? left.begin : right.begin;
          if (left.end === undefined && right.end !== undefined)
              range.end = right.end;
          if (right.end === undefined && left.end !== undefined)
              range.end = left.end;
          if (right.end !== undefined && left.end !== undefined)
              range.end =
                  left.end.diff(right.end).toMillis() > 0 ? left.end : right.end;
          return range;
      }
  }

  class DayInfo {
      number;
      date;
      sessions;
      isWeekend;
      breakDuration;
      constructor(date, sessions, breakDuration, isWeekend) {
          this.date = date;
          this.number = date.day;
          this.sessions = sessions;
          this.breakDuration = breakDuration;
          this.isWeekend = isWeekend;
      }
      // public get offline() {
      //   return this.ComputDurationFromRange(this.offlineRanges)
      // }
      // public get online() {
      //   return this.ComputDurationFromRange(this.onlineRanges)
      // }
      _margedRanges;
      /**
       * Объедененные диапазоны работы всех сессий
       */
      get mergedRanges() {
          if (this._margedRanges !== undefined)
              return this._margedRanges;
          this._margedRanges = this.margeRanges();
          return this._margedRanges;
      }
      _duration;
      /**
       * Продолжительность рабочего дня
       */
      get duration() {
          if (this._duration !== undefined)
              return this._duration;
          this._duration = this.colculateDuration();
          return this._duration;
      }
      /**
       * Объединение всех сессий в одину последовательность диапазонов работы
       */
      margeRanges() {
          var ranges = [];
          var indexInSessions = this.sessions.map((_) => 0);
          const isNotEnd = () => {
              return (this.sessions.find((session, sessionIndex) => indexInSessions[sessionIndex] < session.ranges.length) !== undefined);
          };
          const findStartSessionIndex = () => {
              if (this.sessions.length < 2)
                  return 0;
              var startRanges = this.sessions.map((session, sessionIndex) => session.ranges[indexInSessions[sessionIndex]]);
              var sortedRanges = Array.from(startRanges).sort(TimeRange.compare);
              return startRanges.findIndex((range) => (sortedRanges[0]));
          };
          while (isNotEnd()) {
              var range = new TimeRange();
              var currentSessionIndex = findStartSessionIndex();
              while (isNotEnd()) {
                  var i = currentSessionIndex;
                  for (; i < this.sessions.length; i++) {
                      if (TimeRange.RangeCollision(range, this.sessions[i].ranges[indexInSessions[i]])) {
                          currentSessionIndex = i;
                          break;
                      }
                  }
                  if (i === this.sessions.length)
                      break;
                  range = TimeRange.Merge(range, this.sessions[currentSessionIndex].ranges[indexInSessions[currentSessionIndex]]);
                  indexInSessions[currentSessionIndex]++;
              }
              ranges.push(range);
          }
          return ranges.filter(range => range.begin !== undefined && range.end !== undefined);
      }
      /**
       * Расчет продолжительности рабочего дня
       */
      colculateDuration() {
          var duration = Duration.fromMillis(0);
          this.mergedRanges.forEach((range) => {
              var _diff = range.diff;
              if (_diff != undefined)
                  duration = duration.plus(_diff);
          });
          if (this.takeBreak())
              duration = duration.minus(this.breakDuration);
          return duration;
      }
      /**
       * Проверяет нужно ли учитывать перервыв при расчетах продолжительности
       */
      takeBreak() {
          for (var i = 0; i < this.mergedRanges.length - 1; i++) {
              var current = this.mergedRanges[i];
              var next = this.mergedRanges[i + 1];
              if (current.end === undefined || next.begin === undefined)
                  continue;
              var breakDuration = next.begin.diff(current.end);
              if (breakDuration.plus({ minute: 1 }).toMillis() >= this.breakDuration.toMillis())
                  return false;
          }
          return true;
      }
  }

  class Session {
      source;
      type;
      ranges;
      constructor(source, type, ranges) {
          this.source = source;
          this.type = type;
          this.ranges = ranges;
      }
  }

  class MonthInfo {
      days = [];
      _table;
      filterDate;
      // public get OfflineWorkDuration(): Duration {
      //   return MonthInfo.ComputeDuration(this.days, (d) => { return d.offline });
      // }
      // public get OnlineWorkDuration(): Duration {
      //   return MonthInfo.ComputeDuration(this.days, (d) => { return d.online });
      // }
      /**
       * Общая продолжительность работы в месяце
       */
      get TotalWorkDuration() {
          return MonthInfo.ComputeDuration(this.days, (d) => {
              return d.duration;
          });
      }
      /**
       * Рабочие дни в месяце
       */
      get WorkingDays() {
          return this.days.filter((day) => !day.isWeekend);
      }
      /**
       * Рабочие дни в месяце до сегодняшнего дня
       */
      get WorkingDaysToday() {
          if (this.filterDate.month != DateTime.now().month)
              return this.WorkingDays;
          return this.days.filter((day) => !day.isWeekend && day.date.diff(DateTime.now()).toMillis() < 0);
      }
      /**
       * Отработанные дни
       */
      get DaysWorked() {
          return this.days.filter((day) => day.duration.toMillis() != 0);
      }
      constructor(table, filterDate) {
          this._table = table;
          this.filterDate = filterDate;
          var dayCells = this._table.querySelectorAll("div.crm-tooltip");
          //console.log(dayCells)
          Array.from(dayCells).forEach((element) => {
              if (element.children.length == 0)
                  return;
              //var element = e.children[0] as HTMLDivElement;
              var isWeekend = element.parentElement.style.background ==
                  "rgb(255, 210, 173)";
              var cellContent = element.querySelector("a");
              if (cellContent == undefined)
                  return;
              var date = DateTime.fromObject({
                  year: filterDate.year,
                  month: filterDate.month,
                  day: Number(cellContent.children[0]?.textContent ?? cellContent.textContent),
              });
              var sessions = element.querySelectorAll("div.ai-start:has(div+div)");
              //console.log(sessions)
              var sessionsData = new Array();
              sessions.forEach((session) => {
                  var source = session.children[0].textContent ?? "";
                  var type = session.children[1].children[0].getAttribute("title") ?? "";
                  var sessionSourceRanges = Array.from(session.children[1].children);
                  var sessionRanges = new Array();
                  sessionSourceRanges.forEach((e) => {
                      this.ConstructRanges(sessionRanges, e, date);
                  });
                  sessionsData.push(new Session(source, type, sessionRanges));
              });
              var breakDuration = Duration.fromMillis(0);
              var divs = element.querySelectorAll("div.ai-start");
              if (divs.length > 0 &&
                  (divs[divs.length - 1].textContent?.includes("Обед:") ??
                      false)) {
                  var match = divs[divs.length - 1].textContent.match(/\d+/g)?.[0];
                  if (match === null)
                      return;
                  breakDuration = Duration.fromObject({ minute: Number(match) });
              }
              this.days.push(new DayInfo(date, sessionsData, breakDuration, isWeekend));
          });
          if (filterDate.month == DateTime.now().month) {
              var cday = this.days.findLast((day) => day.number == DateTime.now().day);
              if (cday != undefined) {
                  cday.sessions.forEach((session) => {
                      if (session.ranges[session.ranges.length - 1].end === undefined) {
                          session.ranges[session.ranges.length - 1].end = DateTime.now();
                      }
                  });
              }
          }
      }
      ConstructRanges(ranges, e, date) {
          // hh:mm - hh:mm (?<hours>\d\d):(?<minutes>\d\d)
          var timeRangeRegex = /(?<begin>\d\d:\d\d)?.* - (?<end>\d\d:\d\d)?.*/;
          var timeHHMMRange = /(?<hour>\d\d):(?<minute>\d\d)/;
          var range = e.children[0].textContent?.match(timeRangeRegex)
              ?.groups;
          var beginTime = range?.begin?.match(timeHHMMRange)
              ?.groups;
          if (beginTime != undefined) {
              beginTime.year = date.year;
              beginTime.month = date.month;
              beginTime.day = date.day;
          }
          var begin = beginTime != undefined ? DateTime.fromObject(beginTime) : undefined;
          var endTime = range?.end?.match(timeHHMMRange)?.groups;
          if (endTime != undefined) {
              endTime.year = date.year;
              endTime.month = date.month;
              endTime.day = date.day;
          }
          var end = endTime != undefined ? DateTime.fromObject(endTime) : undefined;
          if (begin != undefined &&
              end != undefined &&
              end?.toSeconds() < begin?.toSeconds()) {
              end = end.plus({ days: 1 });
              //console.log(begin.toString(), end.toString());
          }
          if (begin != undefined || end != undefined)
              ranges.push(new TimeRange(begin, end));
      }
      static ComputeDuration(ranges, selector) {
          var duration = Duration.fromMillis(0);
          ranges.forEach((day) => {
              duration = duration.plus(selector(day));
          });
          return duration;
      }
  }

  /*!
   * @kurkle/color v0.3.4
   * https://github.com/kurkle/color#readme
   * (c) 2024 Jukka Kurkela
   * Released under the MIT License
   */
  function round(v) {
    return v + 0.5 | 0;
  }
  const lim = (v, l, h) => Math.max(Math.min(v, h), l);
  function p2b(v) {
    return lim(round(v * 2.55), 0, 255);
  }
  function n2b(v) {
    return lim(round(v * 255), 0, 255);
  }
  function b2n(v) {
    return lim(round(v / 2.55) / 100, 0, 1);
  }
  function n2p(v) {
    return lim(round(v * 100), 0, 100);
  }

  const map$1 = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15};
  const hex = [...'0123456789ABCDEF'];
  const h1 = b => hex[b & 0xF];
  const h2 = b => hex[(b & 0xF0) >> 4] + hex[b & 0xF];
  const eq = b => ((b & 0xF0) >> 4) === (b & 0xF);
  const isShort = v => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
  function hexParse(str) {
    var len = str.length;
    var ret;
    if (str[0] === '#') {
      if (len === 4 || len === 5) {
        ret = {
          r: 255 & map$1[str[1]] * 17,
          g: 255 & map$1[str[2]] * 17,
          b: 255 & map$1[str[3]] * 17,
          a: len === 5 ? map$1[str[4]] * 17 : 255
        };
      } else if (len === 7 || len === 9) {
        ret = {
          r: map$1[str[1]] << 4 | map$1[str[2]],
          g: map$1[str[3]] << 4 | map$1[str[4]],
          b: map$1[str[5]] << 4 | map$1[str[6]],
          a: len === 9 ? (map$1[str[7]] << 4 | map$1[str[8]]) : 255
        };
      }
    }
    return ret;
  }
  const alpha = (a, f) => a < 255 ? f(a) : '';
  function hexString(v) {
    var f = isShort(v) ? h1 : h2;
    return v
      ? '#' + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f)
      : undefined;
  }

  const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
  function hsl2rgbn(h, s, l) {
    const a = s * Math.min(l, 1 - l);
    const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0), f(8), f(4)];
  }
  function hsv2rgbn(h, s, v) {
    const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)];
  }
  function hwb2rgbn(h, w, b) {
    const rgb = hsl2rgbn(h, 1, 0.5);
    let i;
    if (w + b > 1) {
      i = 1 / (w + b);
      w *= i;
      b *= i;
    }
    for (i = 0; i < 3; i++) {
      rgb[i] *= 1 - w - b;
      rgb[i] += w;
    }
    return rgb;
  }
  function hueValue(r, g, b, d, max) {
    if (r === max) {
      return ((g - b) / d) + (g < b ? 6 : 0);
    }
    if (g === max) {
      return (b - r) / d + 2;
    }
    return (r - g) / d + 4;
  }
  function rgb2hsl(v) {
    const range = 255;
    const r = v.r / range;
    const g = v.g / range;
    const b = v.b / range;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h, s, d;
    if (max !== min) {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = hueValue(r, g, b, d, max);
      h = h * 60 + 0.5;
    }
    return [h | 0, s || 0, l];
  }
  function calln(f, a, b, c) {
    return (
      Array.isArray(a)
        ? f(a[0], a[1], a[2])
        : f(a, b, c)
    ).map(n2b);
  }
  function hsl2rgb(h, s, l) {
    return calln(hsl2rgbn, h, s, l);
  }
  function hwb2rgb(h, w, b) {
    return calln(hwb2rgbn, h, w, b);
  }
  function hsv2rgb(h, s, v) {
    return calln(hsv2rgbn, h, s, v);
  }
  function hue(h) {
    return (h % 360 + 360) % 360;
  }
  function hueParse(str) {
    const m = HUE_RE.exec(str);
    let a = 255;
    let v;
    if (!m) {
      return;
    }
    if (m[5] !== v) {
      a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
    }
    const h = hue(+m[2]);
    const p1 = +m[3] / 100;
    const p2 = +m[4] / 100;
    if (m[1] === 'hwb') {
      v = hwb2rgb(h, p1, p2);
    } else if (m[1] === 'hsv') {
      v = hsv2rgb(h, p1, p2);
    } else {
      v = hsl2rgb(h, p1, p2);
    }
    return {
      r: v[0],
      g: v[1],
      b: v[2],
      a: a
    };
  }
  function rotate(v, deg) {
    var h = rgb2hsl(v);
    h[0] = hue(h[0] + deg);
    h = hsl2rgb(h);
    v.r = h[0];
    v.g = h[1];
    v.b = h[2];
  }
  function hslString(v) {
    if (!v) {
      return;
    }
    const a = rgb2hsl(v);
    const h = a[0];
    const s = n2p(a[1]);
    const l = n2p(a[2]);
    return v.a < 255
      ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})`
      : `hsl(${h}, ${s}%, ${l}%)`;
  }

  const map$2 = {
  	x: 'dark',
  	Z: 'light',
  	Y: 're',
  	X: 'blu',
  	W: 'gr',
  	V: 'medium',
  	U: 'slate',
  	A: 'ee',
  	T: 'ol',
  	S: 'or',
  	B: 'ra',
  	C: 'lateg',
  	D: 'ights',
  	R: 'in',
  	Q: 'turquois',
  	E: 'hi',
  	P: 'ro',
  	O: 'al',
  	N: 'le',
  	M: 'de',
  	L: 'yello',
  	F: 'en',
  	K: 'ch',
  	G: 'arks',
  	H: 'ea',
  	I: 'ightg',
  	J: 'wh'
  };
  const names$1 = {
  	OiceXe: 'f0f8ff',
  	antiquewEte: 'faebd7',
  	aqua: 'ffff',
  	aquamarRe: '7fffd4',
  	azuY: 'f0ffff',
  	beige: 'f5f5dc',
  	bisque: 'ffe4c4',
  	black: '0',
  	blanKedOmond: 'ffebcd',
  	Xe: 'ff',
  	XeviTet: '8a2be2',
  	bPwn: 'a52a2a',
  	burlywood: 'deb887',
  	caMtXe: '5f9ea0',
  	KartYuse: '7fff00',
  	KocTate: 'd2691e',
  	cSO: 'ff7f50',
  	cSnflowerXe: '6495ed',
  	cSnsilk: 'fff8dc',
  	crimson: 'dc143c',
  	cyan: 'ffff',
  	xXe: '8b',
  	xcyan: '8b8b',
  	xgTMnPd: 'b8860b',
  	xWay: 'a9a9a9',
  	xgYF: '6400',
  	xgYy: 'a9a9a9',
  	xkhaki: 'bdb76b',
  	xmagFta: '8b008b',
  	xTivegYF: '556b2f',
  	xSange: 'ff8c00',
  	xScEd: '9932cc',
  	xYd: '8b0000',
  	xsOmon: 'e9967a',
  	xsHgYF: '8fbc8f',
  	xUXe: '483d8b',
  	xUWay: '2f4f4f',
  	xUgYy: '2f4f4f',
  	xQe: 'ced1',
  	xviTet: '9400d3',
  	dAppRk: 'ff1493',
  	dApskyXe: 'bfff',
  	dimWay: '696969',
  	dimgYy: '696969',
  	dodgerXe: '1e90ff',
  	fiYbrick: 'b22222',
  	flSOwEte: 'fffaf0',
  	foYstWAn: '228b22',
  	fuKsia: 'ff00ff',
  	gaRsbSo: 'dcdcdc',
  	ghostwEte: 'f8f8ff',
  	gTd: 'ffd700',
  	gTMnPd: 'daa520',
  	Way: '808080',
  	gYF: '8000',
  	gYFLw: 'adff2f',
  	gYy: '808080',
  	honeyMw: 'f0fff0',
  	hotpRk: 'ff69b4',
  	RdianYd: 'cd5c5c',
  	Rdigo: '4b0082',
  	ivSy: 'fffff0',
  	khaki: 'f0e68c',
  	lavFMr: 'e6e6fa',
  	lavFMrXsh: 'fff0f5',
  	lawngYF: '7cfc00',
  	NmoncEffon: 'fffacd',
  	ZXe: 'add8e6',
  	ZcSO: 'f08080',
  	Zcyan: 'e0ffff',
  	ZgTMnPdLw: 'fafad2',
  	ZWay: 'd3d3d3',
  	ZgYF: '90ee90',
  	ZgYy: 'd3d3d3',
  	ZpRk: 'ffb6c1',
  	ZsOmon: 'ffa07a',
  	ZsHgYF: '20b2aa',
  	ZskyXe: '87cefa',
  	ZUWay: '778899',
  	ZUgYy: '778899',
  	ZstAlXe: 'b0c4de',
  	ZLw: 'ffffe0',
  	lime: 'ff00',
  	limegYF: '32cd32',
  	lRF: 'faf0e6',
  	magFta: 'ff00ff',
  	maPon: '800000',
  	VaquamarRe: '66cdaa',
  	VXe: 'cd',
  	VScEd: 'ba55d3',
  	VpurpN: '9370db',
  	VsHgYF: '3cb371',
  	VUXe: '7b68ee',
  	VsprRggYF: 'fa9a',
  	VQe: '48d1cc',
  	VviTetYd: 'c71585',
  	midnightXe: '191970',
  	mRtcYam: 'f5fffa',
  	mistyPse: 'ffe4e1',
  	moccasR: 'ffe4b5',
  	navajowEte: 'ffdead',
  	navy: '80',
  	Tdlace: 'fdf5e6',
  	Tive: '808000',
  	TivedBb: '6b8e23',
  	Sange: 'ffa500',
  	SangeYd: 'ff4500',
  	ScEd: 'da70d6',
  	pOegTMnPd: 'eee8aa',
  	pOegYF: '98fb98',
  	pOeQe: 'afeeee',
  	pOeviTetYd: 'db7093',
  	papayawEp: 'ffefd5',
  	pHKpuff: 'ffdab9',
  	peru: 'cd853f',
  	pRk: 'ffc0cb',
  	plum: 'dda0dd',
  	powMrXe: 'b0e0e6',
  	purpN: '800080',
  	YbeccapurpN: '663399',
  	Yd: 'ff0000',
  	Psybrown: 'bc8f8f',
  	PyOXe: '4169e1',
  	saddNbPwn: '8b4513',
  	sOmon: 'fa8072',
  	sandybPwn: 'f4a460',
  	sHgYF: '2e8b57',
  	sHshell: 'fff5ee',
  	siFna: 'a0522d',
  	silver: 'c0c0c0',
  	skyXe: '87ceeb',
  	UXe: '6a5acd',
  	UWay: '708090',
  	UgYy: '708090',
  	snow: 'fffafa',
  	sprRggYF: 'ff7f',
  	stAlXe: '4682b4',
  	tan: 'd2b48c',
  	teO: '8080',
  	tEstN: 'd8bfd8',
  	tomato: 'ff6347',
  	Qe: '40e0d0',
  	viTet: 'ee82ee',
  	JHt: 'f5deb3',
  	wEte: 'ffffff',
  	wEtesmoke: 'f5f5f5',
  	Lw: 'ffff00',
  	LwgYF: '9acd32'
  };
  function unpack() {
    const unpacked = {};
    const keys = Object.keys(names$1);
    const tkeys = Object.keys(map$2);
    let i, j, k, ok, nk;
    for (i = 0; i < keys.length; i++) {
      ok = nk = keys[i];
      for (j = 0; j < tkeys.length; j++) {
        k = tkeys[j];
        nk = nk.replace(k, map$2[k]);
      }
      k = parseInt(names$1[ok], 16);
      unpacked[nk] = [k >> 16 & 0xFF, k >> 8 & 0xFF, k & 0xFF];
    }
    return unpacked;
  }

  let names;
  function nameParse(str) {
    if (!names) {
      names = unpack();
      names.transparent = [0, 0, 0, 0];
    }
    const a = names[str.toLowerCase()];
    return a && {
      r: a[0],
      g: a[1],
      b: a[2],
      a: a.length === 4 ? a[3] : 255
    };
  }

  const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
  function rgbParse(str) {
    const m = RGB_RE.exec(str);
    let a = 255;
    let r, g, b;
    if (!m) {
      return;
    }
    if (m[7] !== r) {
      const v = +m[7];
      a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
    }
    r = +m[1];
    g = +m[3];
    b = +m[5];
    r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
    g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
    b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }
  function rgbString(v) {
    return v && (
      v.a < 255
        ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})`
        : `rgb(${v.r}, ${v.g}, ${v.b})`
    );
  }

  const to = v => v <= 0.0031308 ? v * 12.92 : Math.pow(v, 1.0 / 2.4) * 1.055 - 0.055;
  const from = v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  function interpolate$1(rgb1, rgb2, t) {
    const r = from(b2n(rgb1.r));
    const g = from(b2n(rgb1.g));
    const b = from(b2n(rgb1.b));
    return {
      r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
      g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
      b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
      a: rgb1.a + t * (rgb2.a - rgb1.a)
    };
  }

  function modHSL(v, i, ratio) {
    if (v) {
      let tmp = rgb2hsl(v);
      tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
      tmp = hsl2rgb(tmp);
      v.r = tmp[0];
      v.g = tmp[1];
      v.b = tmp[2];
    }
  }
  function clone$1(v, proto) {
    return v ? Object.assign(proto || {}, v) : v;
  }
  function fromObject(input) {
    var v = {r: 0, g: 0, b: 0, a: 255};
    if (Array.isArray(input)) {
      if (input.length >= 3) {
        v = {r: input[0], g: input[1], b: input[2], a: 255};
        if (input.length > 3) {
          v.a = n2b(input[3]);
        }
      }
    } else {
      v = clone$1(input, {r: 0, g: 0, b: 0, a: 1});
      v.a = n2b(v.a);
    }
    return v;
  }
  function functionParse(str) {
    if (str.charAt(0) === 'r') {
      return rgbParse(str);
    }
    return hueParse(str);
  }
  class Color {
    constructor(input) {
      if (input instanceof Color) {
        return input;
      }
      const type = typeof input;
      let v;
      if (type === 'object') {
        v = fromObject(input);
      } else if (type === 'string') {
        v = hexParse(input) || nameParse(input) || functionParse(input);
      }
      this._rgb = v;
      this._valid = !!v;
    }
    get valid() {
      return this._valid;
    }
    get rgb() {
      var v = clone$1(this._rgb);
      if (v) {
        v.a = b2n(v.a);
      }
      return v;
    }
    set rgb(obj) {
      this._rgb = fromObject(obj);
    }
    rgbString() {
      return this._valid ? rgbString(this._rgb) : undefined;
    }
    hexString() {
      return this._valid ? hexString(this._rgb) : undefined;
    }
    hslString() {
      return this._valid ? hslString(this._rgb) : undefined;
    }
    mix(color, weight) {
      if (color) {
        const c1 = this.rgb;
        const c2 = color.rgb;
        let w2;
        const p = weight === w2 ? 0.5 : weight;
        const w = 2 * p - 1;
        const a = c1.a - c2.a;
        const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        w2 = 1 - w1;
        c1.r = 0xFF & w1 * c1.r + w2 * c2.r + 0.5;
        c1.g = 0xFF & w1 * c1.g + w2 * c2.g + 0.5;
        c1.b = 0xFF & w1 * c1.b + w2 * c2.b + 0.5;
        c1.a = p * c1.a + (1 - p) * c2.a;
        this.rgb = c1;
      }
      return this;
    }
    interpolate(color, t) {
      if (color) {
        this._rgb = interpolate$1(this._rgb, color._rgb, t);
      }
      return this;
    }
    clone() {
      return new Color(this.rgb);
    }
    alpha(a) {
      this._rgb.a = n2b(a);
      return this;
    }
    clearer(ratio) {
      const rgb = this._rgb;
      rgb.a *= 1 - ratio;
      return this;
    }
    greyscale() {
      const rgb = this._rgb;
      const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
      rgb.r = rgb.g = rgb.b = val;
      return this;
    }
    opaquer(ratio) {
      const rgb = this._rgb;
      rgb.a *= 1 + ratio;
      return this;
    }
    negate() {
      const v = this._rgb;
      v.r = 255 - v.r;
      v.g = 255 - v.g;
      v.b = 255 - v.b;
      return this;
    }
    lighten(ratio) {
      modHSL(this._rgb, 2, ratio);
      return this;
    }
    darken(ratio) {
      modHSL(this._rgb, 2, -ratio);
      return this;
    }
    saturate(ratio) {
      modHSL(this._rgb, 1, ratio);
      return this;
    }
    desaturate(ratio) {
      modHSL(this._rgb, 1, -ratio);
      return this;
    }
    rotate(deg) {
      rotate(this._rgb, deg);
      return this;
    }
  }

  /*!
   * Chart.js v4.4.9
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   */

  /**
   * @namespace Chart.helpers
   */ /**
   * An empty function that can be used, for example, for optional callback.
   */ function noop() {
  /* noop */ }
  /**
   * Returns a unique id, sequentially generated from a global variable.
   */ const uid = (()=>{
      let id = 0;
      return ()=>id++;
  })();
  /**
   * Returns true if `value` is neither null nor undefined, else returns false.
   * @param value - The value to test.
   * @since 2.7.0
   */ function isNullOrUndef(value) {
      return value === null || value === undefined;
  }
  /**
   * Returns true if `value` is an array (including typed arrays), else returns false.
   * @param value - The value to test.
   * @function
   */ function isArray(value) {
      if (Array.isArray && Array.isArray(value)) {
          return true;
      }
      const type = Object.prototype.toString.call(value);
      if (type.slice(0, 7) === '[object' && type.slice(-6) === 'Array]') {
          return true;
      }
      return false;
  }
  /**
   * Returns true if `value` is an object (excluding null), else returns false.
   * @param value - The value to test.
   * @since 2.7.0
   */ function isObject(value) {
      return value !== null && Object.prototype.toString.call(value) === '[object Object]';
  }
  /**
   * Returns true if `value` is a finite number, else returns false
   * @param value  - The value to test.
   */ function isNumberFinite(value) {
      return (typeof value === 'number' || value instanceof Number) && isFinite(+value);
  }
  /**
   * Returns `value` if finite, else returns `defaultValue`.
   * @param value - The value to return if defined.
   * @param defaultValue - The value to return if `value` is not finite.
   */ function finiteOrDefault(value, defaultValue) {
      return isNumberFinite(value) ? value : defaultValue;
  }
  /**
   * Returns `value` if defined, else returns `defaultValue`.
   * @param value - The value to return if defined.
   * @param defaultValue - The value to return if `value` is undefined.
   */ function valueOrDefault(value, defaultValue) {
      return typeof value === 'undefined' ? defaultValue : value;
  }
  const toPercentage = (value, dimension)=>typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 : +value / dimension;
  const toDimension = (value, dimension)=>typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 * dimension : +value;
  /**
   * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
   * value returned by `fn`. If `fn` is not a function, this method returns undefined.
   * @param fn - The function to call.
   * @param args - The arguments with which `fn` should be called.
   * @param [thisArg] - The value of `this` provided for the call to `fn`.
   */ function callback(fn, args, thisArg) {
      if (fn && typeof fn.call === 'function') {
          return fn.apply(thisArg, args);
      }
  }
  function each(loopable, fn, thisArg, reverse) {
      let i, len, keys;
      if (isArray(loopable)) {
          len = loopable.length;
          {
              for(i = 0; i < len; i++){
                  fn.call(thisArg, loopable[i], i);
              }
          }
      } else if (isObject(loopable)) {
          keys = Object.keys(loopable);
          len = keys.length;
          for(i = 0; i < len; i++){
              fn.call(thisArg, loopable[keys[i]], keys[i]);
          }
      }
  }
  /**
   * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
   * @param a0 - The array to compare
   * @param a1 - The array to compare
   * @private
   */ function _elementsEqual(a0, a1) {
      let i, ilen, v0, v1;
      if (!a0 || !a1 || a0.length !== a1.length) {
          return false;
      }
      for(i = 0, ilen = a0.length; i < ilen; ++i){
          v0 = a0[i];
          v1 = a1[i];
          if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
              return false;
          }
      }
      return true;
  }
  /**
   * Returns a deep copy of `source` without keeping references on objects and arrays.
   * @param source - The value to clone.
   */ function clone(source) {
      if (isArray(source)) {
          return source.map(clone);
      }
      if (isObject(source)) {
          const target = Object.create(null);
          const keys = Object.keys(source);
          const klen = keys.length;
          let k = 0;
          for(; k < klen; ++k){
              target[keys[k]] = clone(source[keys[k]]);
          }
          return target;
      }
      return source;
  }
  function isValidKey(key) {
      return [
          '__proto__',
          'prototype',
          'constructor'
      ].indexOf(key) === -1;
  }
  /**
   * The default merger when Chart.helpers.merge is called without merger option.
   * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
   * @private
   */ function _merger(key, target, source, options) {
      if (!isValidKey(key)) {
          return;
      }
      const tval = target[key];
      const sval = source[key];
      if (isObject(tval) && isObject(sval)) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          merge(tval, sval, options);
      } else {
          target[key] = clone(sval);
      }
  }
  function merge(target, source, options) {
      const sources = isArray(source) ? source : [
          source
      ];
      const ilen = sources.length;
      if (!isObject(target)) {
          return target;
      }
      options = options || {};
      const merger = options.merger || _merger;
      let current;
      for(let i = 0; i < ilen; ++i){
          current = sources[i];
          if (!isObject(current)) {
              continue;
          }
          const keys = Object.keys(current);
          for(let k = 0, klen = keys.length; k < klen; ++k){
              merger(keys[k], target, current, options);
          }
      }
      return target;
  }
  function mergeIf(target, source) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return merge(target, source, {
          merger: _mergerIf
      });
  }
  /**
   * Merges source[key] in target[key] only if target[key] is undefined.
   * @private
   */ function _mergerIf(key, target, source) {
      if (!isValidKey(key)) {
          return;
      }
      const tval = target[key];
      const sval = source[key];
      if (isObject(tval) && isObject(sval)) {
          mergeIf(tval, sval);
      } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
          target[key] = clone(sval);
      }
  }
  // resolveObjectKey resolver cache
  const keyResolvers = {
      // Chart.helpers.core resolveObjectKey should resolve empty key to root object
      '': (v)=>v,
      // default resolvers
      x: (o)=>o.x,
      y: (o)=>o.y
  };
  /**
   * @private
   */ function _splitKey(key) {
      const parts = key.split('.');
      const keys = [];
      let tmp = '';
      for (const part of parts){
          tmp += part;
          if (tmp.endsWith('\\')) {
              tmp = tmp.slice(0, -1) + '.';
          } else {
              keys.push(tmp);
              tmp = '';
          }
      }
      return keys;
  }
  function _getKeyResolver(key) {
      const keys = _splitKey(key);
      return (obj)=>{
          for (const k of keys){
              if (k === '') {
                  break;
              }
              obj = obj && obj[k];
          }
          return obj;
      };
  }
  function resolveObjectKey(obj, key) {
      const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
      return resolver(obj);
  }
  /**
   * @private
   */ function _capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const defined = (value)=>typeof value !== 'undefined';
  const isFunction = (value)=>typeof value === 'function';
  // Adapted from https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality#31129384
  const setsEqual = (a, b)=>{
      if (a.size !== b.size) {
          return false;
      }
      for (const item of a){
          if (!b.has(item)) {
              return false;
          }
      }
      return true;
  };
  /**
   * @param e - The event
   * @private
   */ function _isClickEvent(e) {
      return e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu';
  }

  /**
   * @alias Chart.helpers.math
   * @namespace
   */ const PI = Math.PI;
  const TAU = 2 * PI;
  const PITAU = TAU + PI;
  const INFINITY = Number.POSITIVE_INFINITY;
  const RAD_PER_DEG = PI / 180;
  const HALF_PI = PI / 2;
  const QUARTER_PI = PI / 4;
  const TWO_THIRDS_PI = PI * 2 / 3;
  const log10 = Math.log10;
  const sign = Math.sign;
  function almostEquals(x, y, epsilon) {
      return Math.abs(x - y) < epsilon;
  }
  /**
   * Implementation of the nice number algorithm used in determining where axis labels will go
   */ function niceNum(range) {
      const roundedRange = Math.round(range);
      range = almostEquals(range, roundedRange, range / 1000) ? roundedRange : range;
      const niceRange = Math.pow(10, Math.floor(log10(range)));
      const fraction = range / niceRange;
      const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
      return niceFraction * niceRange;
  }
  /**
   * Returns an array of factors sorted from 1 to sqrt(value)
   * @private
   */ function _factorize(value) {
      const result = [];
      const sqrt = Math.sqrt(value);
      let i;
      for(i = 1; i < sqrt; i++){
          if (value % i === 0) {
              result.push(i);
              result.push(value / i);
          }
      }
      if (sqrt === (sqrt | 0)) {
          result.push(sqrt);
      }
      result.sort((a, b)=>a - b).pop();
      return result;
  }
  /**
   * Verifies that attempting to coerce n to string or number won't throw a TypeError.
   */ function isNonPrimitive(n) {
      return typeof n === 'symbol' || typeof n === 'object' && n !== null && !(Symbol.toPrimitive in n || 'toString' in n || 'valueOf' in n);
  }
  function isNumber(n) {
      return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
  }
  function almostWhole(x, epsilon) {
      const rounded = Math.round(x);
      return rounded - epsilon <= x && rounded + epsilon >= x;
  }
  /**
   * @private
   */ function _setMinAndMaxByKey(array, target, property) {
      let i, ilen, value;
      for(i = 0, ilen = array.length; i < ilen; i++){
          value = array[i][property];
          if (!isNaN(value)) {
              target.min = Math.min(target.min, value);
              target.max = Math.max(target.max, value);
          }
      }
  }
  function toRadians(degrees) {
      return degrees * (PI / 180);
  }
  function toDegrees(radians) {
      return radians * (180 / PI);
  }
  /**
   * Returns the number of decimal places
   * i.e. the number of digits after the decimal point, of the value of this Number.
   * @param x - A number.
   * @returns The number of decimal places.
   * @private
   */ function _decimalPlaces(x) {
      if (!isNumberFinite(x)) {
          return;
      }
      let e = 1;
      let p = 0;
      while(Math.round(x * e) / e !== x){
          e *= 10;
          p++;
      }
      return p;
  }
  // Gets the angle from vertical upright to the point about a centre.
  function getAngleFromPoint(centrePoint, anglePoint) {
      const distanceFromXCenter = anglePoint.x - centrePoint.x;
      const distanceFromYCenter = anglePoint.y - centrePoint.y;
      const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
      let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
      if (angle < -0.5 * PI) {
          angle += TAU; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
      }
      return {
          angle,
          distance: radialDistanceFromCenter
      };
  }
  function distanceBetweenPoints(pt1, pt2) {
      return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
  }
  /**
   * Shortest distance between angles, in either direction.
   * @private
   */ function _angleDiff(a, b) {
      return (a - b + PITAU) % TAU - PI;
  }
  /**
   * Normalize angle to be between 0 and 2*PI
   * @private
   */ function _normalizeAngle(a) {
      return (a % TAU + TAU) % TAU;
  }
  /**
   * @private
   */ function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
      const a = _normalizeAngle(angle);
      const s = _normalizeAngle(start);
      const e = _normalizeAngle(end);
      const angleToStart = _normalizeAngle(s - a);
      const angleToEnd = _normalizeAngle(e - a);
      const startToAngle = _normalizeAngle(a - s);
      const endToAngle = _normalizeAngle(a - e);
      return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
  }
  /**
   * Limit `value` between `min` and `max`
   * @param value
   * @param min
   * @param max
   * @private
   */ function _limitValue(value, min, max) {
      return Math.max(min, Math.min(max, value));
  }
  /**
   * @param {number} value
   * @private
   */ function _int16Range(value) {
      return _limitValue(value, -32768, 32767);
  }
  /**
   * @param value
   * @param start
   * @param end
   * @param [epsilon]
   * @private
   */ function _isBetween(value, start, end, epsilon = 1e-6) {
      return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
  }

  function _lookup(table, value, cmp) {
      cmp = cmp || ((index)=>table[index] < value);
      let hi = table.length - 1;
      let lo = 0;
      let mid;
      while(hi - lo > 1){
          mid = lo + hi >> 1;
          if (cmp(mid)) {
              lo = mid;
          } else {
              hi = mid;
          }
      }
      return {
          lo,
          hi
      };
  }
  /**
   * Binary search
   * @param table - the table search. must be sorted!
   * @param key - property name for the value in each entry
   * @param value - value to find
   * @param last - lookup last index
   * @private
   */ const _lookupByKey = (table, key, value, last)=>_lookup(table, value, last ? (index)=>{
          const ti = table[index][key];
          return ti < value || ti === value && table[index + 1][key] === value;
      } : (index)=>table[index][key] < value);
  /**
   * Reverse binary search
   * @param table - the table search. must be sorted!
   * @param key - property name for the value in each entry
   * @param value - value to find
   * @private
   */ const _rlookupByKey = (table, key, value)=>_lookup(table, value, (index)=>table[index][key] >= value);
  /**
   * Return subset of `values` between `min` and `max` inclusive.
   * Values are assumed to be in sorted order.
   * @param values - sorted array of values
   * @param min - min value
   * @param max - max value
   */ function _filterBetween(values, min, max) {
      let start = 0;
      let end = values.length;
      while(start < end && values[start] < min){
          start++;
      }
      while(end > start && values[end - 1] > max){
          end--;
      }
      return start > 0 || end < values.length ? values.slice(start, end) : values;
  }
  const arrayEvents = [
      'push',
      'pop',
      'shift',
      'splice',
      'unshift'
  ];
  function listenArrayEvents(array, listener) {
      if (array._chartjs) {
          array._chartjs.listeners.push(listener);
          return;
      }
      Object.defineProperty(array, '_chartjs', {
          configurable: true,
          enumerable: false,
          value: {
              listeners: [
                  listener
              ]
          }
      });
      arrayEvents.forEach((key)=>{
          const method = '_onData' + _capitalize(key);
          const base = array[key];
          Object.defineProperty(array, key, {
              configurable: true,
              enumerable: false,
              value (...args) {
                  const res = base.apply(this, args);
                  array._chartjs.listeners.forEach((object)=>{
                      if (typeof object[method] === 'function') {
                          object[method](...args);
                      }
                  });
                  return res;
              }
          });
      });
  }
  function unlistenArrayEvents(array, listener) {
      const stub = array._chartjs;
      if (!stub) {
          return;
      }
      const listeners = stub.listeners;
      const index = listeners.indexOf(listener);
      if (index !== -1) {
          listeners.splice(index, 1);
      }
      if (listeners.length > 0) {
          return;
      }
      arrayEvents.forEach((key)=>{
          delete array[key];
      });
      delete array._chartjs;
  }
  /**
   * @param items
   */ function _arrayUnique(items) {
      const set = new Set(items);
      if (set.size === items.length) {
          return items;
      }
      return Array.from(set);
  }
  /**
  * Request animation polyfill
  */ const requestAnimFrame = function() {
      if (typeof window === 'undefined') {
          return function(callback) {
              return callback();
          };
      }
      return window.requestAnimationFrame;
  }();
  /**
   * Throttles calling `fn` once per animation frame
   * Latest arguments are used on the actual call
   */ function throttled(fn, thisArg) {
      let argsToUse = [];
      let ticking = false;
      return function(...args) {
          // Save the args for use later
          argsToUse = args;
          if (!ticking) {
              ticking = true;
              requestAnimFrame.call(window, ()=>{
                  ticking = false;
                  fn.apply(thisArg, argsToUse);
              });
          }
      };
  }
  /**
   * Debounces calling `fn` for `delay` ms
   */ function debounce(fn, delay) {
      let timeout;
      return function(...args) {
          if (delay) {
              clearTimeout(timeout);
              timeout = setTimeout(fn, delay, args);
          } else {
              fn.apply(this, args);
          }
          return delay;
      };
  }
  /**
   * Converts 'start' to 'left', 'end' to 'right' and others to 'center'
   * @private
   */ const _toLeftRightCenter = (align)=>align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';
  /**
   * Returns `start`, `end` or `(start + end) / 2` depending on `align`. Defaults to `center`
   * @private
   */ const _alignStartEnd = (align, start, end)=>align === 'start' ? start : align === 'end' ? end : (start + end) / 2;
  /**
   * Returns `left`, `right` or `(left + right) / 2` depending on `align`. Defaults to `left`
   * @private
   */ const _textX = (align, left, right, rtl)=>{
      const check = rtl ? 'left' : 'right';
      return align === check ? right : align === 'center' ? (left + right) / 2 : left;
  };
  /**
   * Return start and count of visible points.
   * @private
   */ function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
      const pointCount = points.length;
      let start = 0;
      let count = pointCount;
      if (meta._sorted) {
          const { iScale , vScale , _parsed  } = meta;
          const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
          const axis = iScale.axis;
          const { min , max , minDefined , maxDefined  } = iScale.getUserBounds();
          if (minDefined) {
              start = Math.min(// @ts-expect-error Need to type _parsed
              _lookupByKey(_parsed, axis, min).lo, // @ts-expect-error Need to fix types on _lookupByKey
              animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo);
              if (spanGaps) {
                  const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point)=>!isNullOrUndef(point[vScale.axis]));
                  start -= Math.max(0, distanceToDefinedLo);
              }
              start = _limitValue(start, 0, pointCount - 1);
          }
          if (maxDefined) {
              let end = Math.max(// @ts-expect-error Need to type _parsed
              _lookupByKey(_parsed, iScale.axis, max, true).hi + 1, // @ts-expect-error Need to fix types on _lookupByKey
              animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1);
              if (spanGaps) {
                  const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point)=>!isNullOrUndef(point[vScale.axis]));
                  end += Math.max(0, distanceToDefinedHi);
              }
              count = _limitValue(end, start, pointCount) - start;
          } else {
              count = pointCount - start;
          }
      }
      return {
          start,
          count
      };
  }
  /**
   * Checks if the scale ranges have changed.
   * @param {object} meta - dataset meta.
   * @returns {boolean}
   * @private
   */ function _scaleRangesChanged(meta) {
      const { xScale , yScale , _scaleRanges  } = meta;
      const newRanges = {
          xmin: xScale.min,
          xmax: xScale.max,
          ymin: yScale.min,
          ymax: yScale.max
      };
      if (!_scaleRanges) {
          meta._scaleRanges = newRanges;
          return true;
      }
      const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
      Object.assign(_scaleRanges, newRanges);
      return changed;
  }

  const atEdge = (t)=>t === 0 || t === 1;
  const elasticIn = (t, s, p)=>-(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
  const elasticOut = (t, s, p)=>Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
  /**
   * Easing functions adapted from Robert Penner's easing equations.
   * @namespace Chart.helpers.easing.effects
   * @see http://www.robertpenner.com/easing/
   */ const effects = {
      linear: (t)=>t,
      easeInQuad: (t)=>t * t,
      easeOutQuad: (t)=>-t * (t - 2),
      easeInOutQuad: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
      easeInCubic: (t)=>t * t * t,
      easeOutCubic: (t)=>(t -= 1) * t * t + 1,
      easeInOutCubic: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
      easeInQuart: (t)=>t * t * t * t,
      easeOutQuart: (t)=>-((t -= 1) * t * t * t - 1),
      easeInOutQuart: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
      easeInQuint: (t)=>t * t * t * t * t,
      easeOutQuint: (t)=>(t -= 1) * t * t * t * t + 1,
      easeInOutQuint: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
      easeInSine: (t)=>-Math.cos(t * HALF_PI) + 1,
      easeOutSine: (t)=>Math.sin(t * HALF_PI),
      easeInOutSine: (t)=>-0.5 * (Math.cos(PI * t) - 1),
      easeInExpo: (t)=>t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
      easeOutExpo: (t)=>t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
      easeInOutExpo: (t)=>atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
      easeInCirc: (t)=>t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
      easeOutCirc: (t)=>Math.sqrt(1 - (t -= 1) * t),
      easeInOutCirc: (t)=>(t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
      easeInElastic: (t)=>atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
      easeOutElastic: (t)=>atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
      easeInOutElastic (t) {
          const s = 0.1125;
          const p = 0.45;
          return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
      },
      easeInBack (t) {
          const s = 1.70158;
          return t * t * ((s + 1) * t - s);
      },
      easeOutBack (t) {
          const s = 1.70158;
          return (t -= 1) * t * ((s + 1) * t + s) + 1;
      },
      easeInOutBack (t) {
          let s = 1.70158;
          if ((t /= 0.5) < 1) {
              return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
          }
          return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
      },
      easeInBounce: (t)=>1 - effects.easeOutBounce(1 - t),
      easeOutBounce (t) {
          const m = 7.5625;
          const d = 2.75;
          if (t < 1 / d) {
              return m * t * t;
          }
          if (t < 2 / d) {
              return m * (t -= 1.5 / d) * t + 0.75;
          }
          if (t < 2.5 / d) {
              return m * (t -= 2.25 / d) * t + 0.9375;
          }
          return m * (t -= 2.625 / d) * t + 0.984375;
      },
      easeInOutBounce: (t)=>t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
  };

  function isPatternOrGradient(value) {
      if (value && typeof value === 'object') {
          const type = value.toString();
          return type === '[object CanvasPattern]' || type === '[object CanvasGradient]';
      }
      return false;
  }
  function color(value) {
      return isPatternOrGradient(value) ? value : new Color(value);
  }
  function getHoverColor(value) {
      return isPatternOrGradient(value) ? value : new Color(value).saturate(0.5).darken(0.1).hexString();
  }

  const numbers = [
      'x',
      'y',
      'borderWidth',
      'radius',
      'tension'
  ];
  const colors = [
      'color',
      'borderColor',
      'backgroundColor'
  ];
  function applyAnimationsDefaults(defaults) {
      defaults.set('animation', {
          delay: undefined,
          duration: 1000,
          easing: 'easeOutQuart',
          fn: undefined,
          from: undefined,
          loop: undefined,
          to: undefined,
          type: undefined
      });
      defaults.describe('animation', {
          _fallback: false,
          _indexable: false,
          _scriptable: (name)=>name !== 'onProgress' && name !== 'onComplete' && name !== 'fn'
      });
      defaults.set('animations', {
          colors: {
              type: 'color',
              properties: colors
          },
          numbers: {
              type: 'number',
              properties: numbers
          }
      });
      defaults.describe('animations', {
          _fallback: 'animation'
      });
      defaults.set('transitions', {
          active: {
              animation: {
                  duration: 400
              }
          },
          resize: {
              animation: {
                  duration: 0
              }
          },
          show: {
              animations: {
                  colors: {
                      from: 'transparent'
                  },
                  visible: {
                      type: 'boolean',
                      duration: 0
                  }
              }
          },
          hide: {
              animations: {
                  colors: {
                      to: 'transparent'
                  },
                  visible: {
                      type: 'boolean',
                      easing: 'linear',
                      fn: (v)=>v | 0
                  }
              }
          }
      });
  }

  function applyLayoutsDefaults(defaults) {
      defaults.set('layout', {
          autoPadding: true,
          padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
          }
      });
  }

  const intlCache = new Map();
  function getNumberFormat(locale, options) {
      options = options || {};
      const cacheKey = locale + JSON.stringify(options);
      let formatter = intlCache.get(cacheKey);
      if (!formatter) {
          formatter = new Intl.NumberFormat(locale, options);
          intlCache.set(cacheKey, formatter);
      }
      return formatter;
  }
  function formatNumber(num, locale, options) {
      return getNumberFormat(locale, options).format(num);
  }

  const formatters = {
   values (value) {
          return isArray(value) ?  value : '' + value;
      },
   numeric (tickValue, index, ticks) {
          if (tickValue === 0) {
              return '0';
          }
          const locale = this.chart.options.locale;
          let notation;
          let delta = tickValue;
          if (ticks.length > 1) {
              const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
              if (maxTick < 1e-4 || maxTick > 1e+15) {
                  notation = 'scientific';
              }
              delta = calculateDelta(tickValue, ticks);
          }
          const logDelta = log10(Math.abs(delta));
          const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
          const options = {
              notation,
              minimumFractionDigits: numDecimal,
              maximumFractionDigits: numDecimal
          };
          Object.assign(options, this.options.ticks.format);
          return formatNumber(tickValue, locale, options);
      },
   logarithmic (tickValue, index, ticks) {
          if (tickValue === 0) {
              return '0';
          }
          const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
          if ([
              1,
              2,
              3,
              5,
              10,
              15
          ].includes(remain) || index > 0.8 * ticks.length) {
              return formatters.numeric.call(this, tickValue, index, ticks);
          }
          return '';
      }
  };
  function calculateDelta(tickValue, ticks) {
      let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
      if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
          delta = tickValue - Math.floor(tickValue);
      }
      return delta;
  }
   var Ticks = {
      formatters
  };

  function applyScaleDefaults(defaults) {
      defaults.set('scale', {
          display: true,
          offset: false,
          reverse: false,
          beginAtZero: false,
   bounds: 'ticks',
          clip: true,
   grace: 0,
          grid: {
              display: true,
              lineWidth: 1,
              drawOnChartArea: true,
              drawTicks: true,
              tickLength: 8,
              tickWidth: (_ctx, options)=>options.lineWidth,
              tickColor: (_ctx, options)=>options.color,
              offset: false
          },
          border: {
              display: true,
              dash: [],
              dashOffset: 0.0,
              width: 1
          },
          title: {
              display: false,
              text: '',
              padding: {
                  top: 4,
                  bottom: 4
              }
          },
          ticks: {
              minRotation: 0,
              maxRotation: 50,
              mirror: false,
              textStrokeWidth: 0,
              textStrokeColor: '',
              padding: 3,
              display: true,
              autoSkip: true,
              autoSkipPadding: 3,
              labelOffset: 0,
              callback: Ticks.formatters.values,
              minor: {},
              major: {},
              align: 'center',
              crossAlign: 'near',
              showLabelBackdrop: false,
              backdropColor: 'rgba(255, 255, 255, 0.75)',
              backdropPadding: 2
          }
      });
      defaults.route('scale.ticks', 'color', '', 'color');
      defaults.route('scale.grid', 'color', '', 'borderColor');
      defaults.route('scale.border', 'color', '', 'borderColor');
      defaults.route('scale.title', 'color', '', 'color');
      defaults.describe('scale', {
          _fallback: false,
          _scriptable: (name)=>!name.startsWith('before') && !name.startsWith('after') && name !== 'callback' && name !== 'parser',
          _indexable: (name)=>name !== 'borderDash' && name !== 'tickBorderDash' && name !== 'dash'
      });
      defaults.describe('scales', {
          _fallback: 'scale'
      });
      defaults.describe('scale.ticks', {
          _scriptable: (name)=>name !== 'backdropPadding' && name !== 'callback',
          _indexable: (name)=>name !== 'backdropPadding'
      });
  }

  const overrides = Object.create(null);
  const descriptors = Object.create(null);
   function getScope$1(node, key) {
      if (!key) {
          return node;
      }
      const keys = key.split('.');
      for(let i = 0, n = keys.length; i < n; ++i){
          const k = keys[i];
          node = node[k] || (node[k] = Object.create(null));
      }
      return node;
  }
  function set(root, scope, values) {
      if (typeof scope === 'string') {
          return merge(getScope$1(root, scope), values);
      }
      return merge(getScope$1(root, ''), scope);
  }
   class Defaults {
      constructor(_descriptors, _appliers){
          this.animation = undefined;
          this.backgroundColor = 'rgba(0,0,0,0.1)';
          this.borderColor = 'rgba(0,0,0,0.1)';
          this.color = '#666';
          this.datasets = {};
          this.devicePixelRatio = (context)=>context.chart.platform.getDevicePixelRatio();
          this.elements = {};
          this.events = [
              'mousemove',
              'mouseout',
              'click',
              'touchstart',
              'touchmove'
          ];
          this.font = {
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              size: 12,
              style: 'normal',
              lineHeight: 1.2,
              weight: null
          };
          this.hover = {};
          this.hoverBackgroundColor = (ctx, options)=>getHoverColor(options.backgroundColor);
          this.hoverBorderColor = (ctx, options)=>getHoverColor(options.borderColor);
          this.hoverColor = (ctx, options)=>getHoverColor(options.color);
          this.indexAxis = 'x';
          this.interaction = {
              mode: 'nearest',
              intersect: true,
              includeInvisible: false
          };
          this.maintainAspectRatio = true;
          this.onHover = null;
          this.onClick = null;
          this.parsing = true;
          this.plugins = {};
          this.responsive = true;
          this.scale = undefined;
          this.scales = {};
          this.showLine = true;
          this.drawActiveElementsOnTop = true;
          this.describe(_descriptors);
          this.apply(_appliers);
      }
   set(scope, values) {
          return set(this, scope, values);
      }
   get(scope) {
          return getScope$1(this, scope);
      }
   describe(scope, values) {
          return set(descriptors, scope, values);
      }
      override(scope, values) {
          return set(overrides, scope, values);
      }
   route(scope, name, targetScope, targetName) {
          const scopeObject = getScope$1(this, scope);
          const targetScopeObject = getScope$1(this, targetScope);
          const privateName = '_' + name;
          Object.defineProperties(scopeObject, {
              [privateName]: {
                  value: scopeObject[name],
                  writable: true
              },
              [name]: {
                  enumerable: true,
                  get () {
                      const local = this[privateName];
                      const target = targetScopeObject[targetName];
                      if (isObject(local)) {
                          return Object.assign({}, target, local);
                      }
                      return valueOrDefault(local, target);
                  },
                  set (value) {
                      this[privateName] = value;
                  }
              }
          });
      }
      apply(appliers) {
          appliers.forEach((apply)=>apply(this));
      }
  }
  var defaults = /* #__PURE__ */ new Defaults({
      _scriptable: (name)=>!name.startsWith('on'),
      _indexable: (name)=>name !== 'events',
      hover: {
          _fallback: 'interaction'
      },
      interaction: {
          _scriptable: false,
          _indexable: false
      }
  }, [
      applyAnimationsDefaults,
      applyLayoutsDefaults,
      applyScaleDefaults
  ]);

  /**
   * Converts the given font object into a CSS font string.
   * @param font - A font object.
   * @return The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
   * @private
   */ function toFontString(font) {
      if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
          return null;
      }
      return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
  }
  /**
   * @private
   */ function _measureText(ctx, data, gc, longest, string) {
      let textWidth = data[string];
      if (!textWidth) {
          textWidth = data[string] = ctx.measureText(string).width;
          gc.push(string);
      }
      if (textWidth > longest) {
          longest = textWidth;
      }
      return longest;
  }
  /**
   * @private
   */ // eslint-disable-next-line complexity
  function _longestText(ctx, font, arrayOfThings, cache) {
      cache = cache || {};
      let data = cache.data = cache.data || {};
      let gc = cache.garbageCollect = cache.garbageCollect || [];
      if (cache.font !== font) {
          data = cache.data = {};
          gc = cache.garbageCollect = [];
          cache.font = font;
      }
      ctx.save();
      ctx.font = font;
      let longest = 0;
      const ilen = arrayOfThings.length;
      let i, j, jlen, thing, nestedThing;
      for(i = 0; i < ilen; i++){
          thing = arrayOfThings[i];
          // Undefined strings and arrays should not be measured
          if (thing !== undefined && thing !== null && !isArray(thing)) {
              longest = _measureText(ctx, data, gc, longest, thing);
          } else if (isArray(thing)) {
              // if it is an array lets measure each element
              // to do maybe simplify this function a bit so we can do this more recursively?
              for(j = 0, jlen = thing.length; j < jlen; j++){
                  nestedThing = thing[j];
                  // Undefined strings and arrays should not be measured
                  if (nestedThing !== undefined && nestedThing !== null && !isArray(nestedThing)) {
                      longest = _measureText(ctx, data, gc, longest, nestedThing);
                  }
              }
          }
      }
      ctx.restore();
      const gcLen = gc.length / 2;
      if (gcLen > arrayOfThings.length) {
          for(i = 0; i < gcLen; i++){
              delete data[gc[i]];
          }
          gc.splice(0, gcLen);
      }
      return longest;
  }
  /**
   * Returns the aligned pixel value to avoid anti-aliasing blur
   * @param chart - The chart instance.
   * @param pixel - A pixel value.
   * @param width - The width of the element.
   * @returns The aligned pixel value.
   * @private
   */ function _alignPixel(chart, pixel, width) {
      const devicePixelRatio = chart.currentDevicePixelRatio;
      const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
      return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
  }
  /**
   * Clears the entire canvas.
   */ function clearCanvas(canvas, ctx) {
      if (!ctx && !canvas) {
          return;
      }
      ctx = ctx || canvas.getContext('2d');
      ctx.save();
      // canvas.width and canvas.height do not consider the canvas transform,
      // while clearRect does
      ctx.resetTransform();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
  }
  function drawPoint(ctx, options, x, y) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      drawPointLegend(ctx, options, x, y, null);
  }
  // eslint-disable-next-line complexity
  function drawPointLegend(ctx, options, x, y, w) {
      let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
      const style = options.pointStyle;
      const rotation = options.rotation;
      const radius = options.radius;
      let rad = (rotation || 0) * RAD_PER_DEG;
      if (style && typeof style === 'object') {
          type = style.toString();
          if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(rad);
              ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
              ctx.restore();
              return;
          }
      }
      if (isNaN(radius) || radius <= 0) {
          return;
      }
      ctx.beginPath();
      switch(style){
          // Default includes circle
          default:
              if (w) {
                  ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
              } else {
                  ctx.arc(x, y, radius, 0, TAU);
              }
              ctx.closePath();
              break;
          case 'triangle':
              width = w ? w / 2 : radius;
              ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
              rad += TWO_THIRDS_PI;
              ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
              ctx.closePath();
              break;
          case 'rectRounded':
              // NOTE: the rounded rect implementation changed to use `arc` instead of
              // `quadraticCurveTo` since it generates better results when rect is
              // almost a circle. 0.516 (instead of 0.5) produces results with visually
              // closer proportion to the previous impl and it is inscribed in the
              // circle with `radius`. For more details, see the following PRs:
              // https://github.com/chartjs/Chart.js/issues/5597
              // https://github.com/chartjs/Chart.js/issues/5858
              cornerRadius = radius * 0.516;
              size = radius - cornerRadius;
              xOffset = Math.cos(rad + QUARTER_PI) * size;
              xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
              yOffset = Math.sin(rad + QUARTER_PI) * size;
              yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
              ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
              ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
              ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
              ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
              ctx.closePath();
              break;
          case 'rect':
              if (!rotation) {
                  size = Math.SQRT1_2 * radius;
                  width = w ? w / 2 : size;
                  ctx.rect(x - width, y - size, 2 * width, 2 * size);
                  break;
              }
              rad += QUARTER_PI;
          /* falls through */ case 'rectRot':
              xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
              ctx.moveTo(x - xOffsetW, y - yOffset);
              ctx.lineTo(x + yOffsetW, y - xOffset);
              ctx.lineTo(x + xOffsetW, y + yOffset);
              ctx.lineTo(x - yOffsetW, y + xOffset);
              ctx.closePath();
              break;
          case 'crossRot':
              rad += QUARTER_PI;
          /* falls through */ case 'cross':
              xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
              ctx.moveTo(x - xOffsetW, y - yOffset);
              ctx.lineTo(x + xOffsetW, y + yOffset);
              ctx.moveTo(x + yOffsetW, y - xOffset);
              ctx.lineTo(x - yOffsetW, y + xOffset);
              break;
          case 'star':
              xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
              ctx.moveTo(x - xOffsetW, y - yOffset);
              ctx.lineTo(x + xOffsetW, y + yOffset);
              ctx.moveTo(x + yOffsetW, y - xOffset);
              ctx.lineTo(x - yOffsetW, y + xOffset);
              rad += QUARTER_PI;
              xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
              xOffset = Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
              ctx.moveTo(x - xOffsetW, y - yOffset);
              ctx.lineTo(x + xOffsetW, y + yOffset);
              ctx.moveTo(x + yOffsetW, y - xOffset);
              ctx.lineTo(x - yOffsetW, y + xOffset);
              break;
          case 'line':
              xOffset = w ? w / 2 : Math.cos(rad) * radius;
              yOffset = Math.sin(rad) * radius;
              ctx.moveTo(x - xOffset, y - yOffset);
              ctx.lineTo(x + xOffset, y + yOffset);
              break;
          case 'dash':
              ctx.moveTo(x, y);
              ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
              break;
          case false:
              ctx.closePath();
              break;
      }
      ctx.fill();
      if (options.borderWidth > 0) {
          ctx.stroke();
      }
  }
  /**
   * Returns true if the point is inside the rectangle
   * @param point - The point to test
   * @param area - The rectangle
   * @param margin - allowed margin
   * @private
   */ function _isPointInArea(point, area, margin) {
      margin = margin || 0.5; // margin - default is to match rounded decimals
      return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
  }
  function clipArea(ctx, area) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
      ctx.clip();
  }
  function unclipArea(ctx) {
      ctx.restore();
  }
  /**
   * @private
   */ function _steppedLineTo(ctx, previous, target, flip, mode) {
      if (!previous) {
          return ctx.lineTo(target.x, target.y);
      }
      if (mode === 'middle') {
          const midpoint = (previous.x + target.x) / 2.0;
          ctx.lineTo(midpoint, previous.y);
          ctx.lineTo(midpoint, target.y);
      } else if (mode === 'after' !== !!flip) {
          ctx.lineTo(previous.x, target.y);
      } else {
          ctx.lineTo(target.x, previous.y);
      }
      ctx.lineTo(target.x, target.y);
  }
  /**
   * @private
   */ function _bezierCurveTo(ctx, previous, target, flip) {
      if (!previous) {
          return ctx.lineTo(target.x, target.y);
      }
      ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
  }
  function setRenderOpts(ctx, opts) {
      if (opts.translation) {
          ctx.translate(opts.translation[0], opts.translation[1]);
      }
      if (!isNullOrUndef(opts.rotation)) {
          ctx.rotate(opts.rotation);
      }
      if (opts.color) {
          ctx.fillStyle = opts.color;
      }
      if (opts.textAlign) {
          ctx.textAlign = opts.textAlign;
      }
      if (opts.textBaseline) {
          ctx.textBaseline = opts.textBaseline;
      }
  }
  function decorateText(ctx, x, y, line, opts) {
      if (opts.strikethrough || opts.underline) {
          /**
       * Now that IE11 support has been dropped, we can use more
       * of the TextMetrics object. The actual bounding boxes
       * are unflagged in Chrome, Firefox, Edge, and Safari so they
       * can be safely used.
       * See https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#Browser_compatibility
       */ const metrics = ctx.measureText(line);
          const left = x - metrics.actualBoundingBoxLeft;
          const right = x + metrics.actualBoundingBoxRight;
          const top = y - metrics.actualBoundingBoxAscent;
          const bottom = y + metrics.actualBoundingBoxDescent;
          const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.beginPath();
          ctx.lineWidth = opts.decorationWidth || 2;
          ctx.moveTo(left, yDecoration);
          ctx.lineTo(right, yDecoration);
          ctx.stroke();
      }
  }
  function drawBackdrop(ctx, opts) {
      const oldColor = ctx.fillStyle;
      ctx.fillStyle = opts.color;
      ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
      ctx.fillStyle = oldColor;
  }
  /**
   * Render text onto the canvas
   */ function renderText(ctx, text, x, y, font, opts = {}) {
      const lines = isArray(text) ? text : [
          text
      ];
      const stroke = opts.strokeWidth > 0 && opts.strokeColor !== '';
      let i, line;
      ctx.save();
      ctx.font = font.string;
      setRenderOpts(ctx, opts);
      for(i = 0; i < lines.length; ++i){
          line = lines[i];
          if (opts.backdrop) {
              drawBackdrop(ctx, opts.backdrop);
          }
          if (stroke) {
              if (opts.strokeColor) {
                  ctx.strokeStyle = opts.strokeColor;
              }
              if (!isNullOrUndef(opts.strokeWidth)) {
                  ctx.lineWidth = opts.strokeWidth;
              }
              ctx.strokeText(line, x, y, opts.maxWidth);
          }
          ctx.fillText(line, x, y, opts.maxWidth);
          decorateText(ctx, x, y, line, opts);
          y += Number(font.lineHeight);
      }
      ctx.restore();
  }
  /**
   * Add a path of a rectangle with rounded corners to the current sub-path
   * @param ctx - Context
   * @param rect - Bounding rect
   */ function addRoundedRectPath(ctx, rect) {
      const { x , y , w , h , radius  } = rect;
      // top left arc
      ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
      // line from top left to bottom left
      ctx.lineTo(x, y + h - radius.bottomLeft);
      // bottom left arc
      ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
      // line from bottom left to bottom right
      ctx.lineTo(x + w - radius.bottomRight, y + h);
      // bottom right arc
      ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
      // line from bottom right to top right
      ctx.lineTo(x + w, y + radius.topRight);
      // top right arc
      ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
      // line from top right to top left
      ctx.lineTo(x + radius.topLeft, y);
  }

  const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
  const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
  /**
   * @alias Chart.helpers.options
   * @namespace
   */ /**
   * Converts the given line height `value` in pixels for a specific font `size`.
   * @param value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
   * @param size - The font size (in pixels) used to resolve relative `value`.
   * @returns The effective line height in pixels (size * 1.2 if value is invalid).
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
   * @since 2.7.0
   */ function toLineHeight(value, size) {
      const matches = ('' + value).match(LINE_HEIGHT);
      if (!matches || matches[1] === 'normal') {
          return size * 1.2;
      }
      value = +matches[2];
      switch(matches[3]){
          case 'px':
              return value;
          case '%':
              value /= 100;
              break;
      }
      return size * value;
  }
  const numberOrZero = (v)=>+v || 0;
  function _readValueToProps(value, props) {
      const ret = {};
      const objProps = isObject(props);
      const keys = objProps ? Object.keys(props) : props;
      const read = isObject(value) ? objProps ? (prop)=>valueOrDefault(value[prop], value[props[prop]]) : (prop)=>value[prop] : ()=>value;
      for (const prop of keys){
          ret[prop] = numberOrZero(read(prop));
      }
      return ret;
  }
  /**
   * Converts the given value into a TRBL object.
   * @param value - If a number, set the value to all TRBL component,
   *  else, if an object, use defined properties and sets undefined ones to 0.
   *  x / y are shorthands for same value for left/right and top/bottom.
   * @returns The padding values (top, right, bottom, left)
   * @since 3.0.0
   */ function toTRBL(value) {
      return _readValueToProps(value, {
          top: 'y',
          right: 'x',
          bottom: 'y',
          left: 'x'
      });
  }
  /**
   * Converts the given value into a TRBL corners object (similar with css border-radius).
   * @param value - If a number, set the value to all TRBL corner components,
   *  else, if an object, use defined properties and sets undefined ones to 0.
   * @returns The TRBL corner values (topLeft, topRight, bottomLeft, bottomRight)
   * @since 3.0.0
   */ function toTRBLCorners(value) {
      return _readValueToProps(value, [
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight'
      ]);
  }
  /**
   * Converts the given value into a padding object with pre-computed width/height.
   * @param value - If a number, set the value to all TRBL component,
   *  else, if an object, use defined properties and sets undefined ones to 0.
   *  x / y are shorthands for same value for left/right and top/bottom.
   * @returns The padding values (top, right, bottom, left, width, height)
   * @since 2.7.0
   */ function toPadding(value) {
      const obj = toTRBL(value);
      obj.width = obj.left + obj.right;
      obj.height = obj.top + obj.bottom;
      return obj;
  }
  /**
   * Parses font options and returns the font object.
   * @param options - A object that contains font options to be parsed.
   * @param fallback - A object that contains fallback font options.
   * @return The font object.
   * @private
   */ function toFont(options, fallback) {
      options = options || {};
      fallback = fallback || defaults.font;
      let size = valueOrDefault(options.size, fallback.size);
      if (typeof size === 'string') {
          size = parseInt(size, 10);
      }
      let style = valueOrDefault(options.style, fallback.style);
      if (style && !('' + style).match(FONT_STYLE)) {
          console.warn('Invalid font style specified: "' + style + '"');
          style = undefined;
      }
      const font = {
          family: valueOrDefault(options.family, fallback.family),
          lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
          size,
          style,
          weight: valueOrDefault(options.weight, fallback.weight),
          string: ''
      };
      font.string = toFontString(font);
      return font;
  }
  /**
   * Evaluates the given `inputs` sequentially and returns the first defined value.
   * @param inputs - An array of values, falling back to the last value.
   * @param context - If defined and the current value is a function, the value
   * is called with `context` as first argument and the result becomes the new input.
   * @param index - If defined and the current value is an array, the value
   * at `index` become the new input.
   * @param info - object to return information about resolution in
   * @param info.cacheable - Will be set to `false` if option is not cacheable.
   * @since 2.7.0
   */ function resolve(inputs, context, index, info) {
      let i, ilen, value;
      for(i = 0, ilen = inputs.length; i < ilen; ++i){
          value = inputs[i];
          if (value === undefined) {
              continue;
          }
          if (value !== undefined) {
              return value;
          }
      }
  }
  /**
   * @param minmax
   * @param grace
   * @param beginAtZero
   * @private
   */ function _addGrace(minmax, grace, beginAtZero) {
      const { min , max  } = minmax;
      const change = toDimension(grace, (max - min) / 2);
      const keepZero = (value, add)=>beginAtZero && value === 0 ? 0 : value + add;
      return {
          min: keepZero(min, -Math.abs(change)),
          max: keepZero(max, change)
      };
  }
  function createContext(parentContext, context) {
      return Object.assign(Object.create(parentContext), context);
  }

  /**
   * Creates a Proxy for resolving raw values for options.
   * @param scopes - The option scopes to look for values, in resolution order
   * @param prefixes - The prefixes for values, in resolution order.
   * @param rootScopes - The root option scopes
   * @param fallback - Parent scopes fallback
   * @param getTarget - callback for getting the target for changed values
   * @returns Proxy
   * @private
   */ function _createResolver(scopes, prefixes = [
      ''
  ], rootScopes, fallback, getTarget = ()=>scopes[0]) {
      const finalRootScopes = rootScopes || scopes;
      if (typeof fallback === 'undefined') {
          fallback = _resolve('_fallback', scopes);
      }
      const cache = {
          [Symbol.toStringTag]: 'Object',
          _cacheable: true,
          _scopes: scopes,
          _rootScopes: finalRootScopes,
          _fallback: fallback,
          _getTarget: getTarget,
          override: (scope)=>_createResolver([
                  scope,
                  ...scopes
              ], prefixes, finalRootScopes, fallback)
      };
      return new Proxy(cache, {
          /**
       * A trap for the delete operator.
       */ deleteProperty (target, prop) {
              delete target[prop]; // remove from cache
              delete target._keys; // remove cached keys
              delete scopes[0][prop]; // remove from top level scope
              return true;
          },
          /**
       * A trap for getting property values.
       */ get (target, prop) {
              return _cached(target, prop, ()=>_resolveWithPrefixes(prop, prefixes, scopes, target));
          },
          /**
       * A trap for Object.getOwnPropertyDescriptor.
       * Also used by Object.hasOwnProperty.
       */ getOwnPropertyDescriptor (target, prop) {
              return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
          },
          /**
       * A trap for Object.getPrototypeOf.
       */ getPrototypeOf () {
              return Reflect.getPrototypeOf(scopes[0]);
          },
          /**
       * A trap for the in operator.
       */ has (target, prop) {
              return getKeysFromAllScopes(target).includes(prop);
          },
          /**
       * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
       */ ownKeys (target) {
              return getKeysFromAllScopes(target);
          },
          /**
       * A trap for setting property values.
       */ set (target, prop, value) {
              const storage = target._storage || (target._storage = getTarget());
              target[prop] = storage[prop] = value; // set to top level scope + cache
              delete target._keys; // remove cached keys
              return true;
          }
      });
  }
  /**
   * Returns an Proxy for resolving option values with context.
   * @param proxy - The Proxy returned by `_createResolver`
   * @param context - Context object for scriptable/indexable options
   * @param subProxy - The proxy provided for scriptable options
   * @param descriptorDefaults - Defaults for descriptors
   * @private
   */ function _attachContext(proxy, context, subProxy, descriptorDefaults) {
      const cache = {
          _cacheable: false,
          _proxy: proxy,
          _context: context,
          _subProxy: subProxy,
          _stack: new Set(),
          _descriptors: _descriptors(proxy, descriptorDefaults),
          setContext: (ctx)=>_attachContext(proxy, ctx, subProxy, descriptorDefaults),
          override: (scope)=>_attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
      };
      return new Proxy(cache, {
          /**
       * A trap for the delete operator.
       */ deleteProperty (target, prop) {
              delete target[prop]; // remove from cache
              delete proxy[prop]; // remove from proxy
              return true;
          },
          /**
       * A trap for getting property values.
       */ get (target, prop, receiver) {
              return _cached(target, prop, ()=>_resolveWithContext(target, prop, receiver));
          },
          /**
       * A trap for Object.getOwnPropertyDescriptor.
       * Also used by Object.hasOwnProperty.
       */ getOwnPropertyDescriptor (target, prop) {
              return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
                  enumerable: true,
                  configurable: true
              } : undefined : Reflect.getOwnPropertyDescriptor(proxy, prop);
          },
          /**
       * A trap for Object.getPrototypeOf.
       */ getPrototypeOf () {
              return Reflect.getPrototypeOf(proxy);
          },
          /**
       * A trap for the in operator.
       */ has (target, prop) {
              return Reflect.has(proxy, prop);
          },
          /**
       * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
       */ ownKeys () {
              return Reflect.ownKeys(proxy);
          },
          /**
       * A trap for setting property values.
       */ set (target, prop, value) {
              proxy[prop] = value; // set to proxy
              delete target[prop]; // remove from cache
              return true;
          }
      });
  }
  /**
   * @private
   */ function _descriptors(proxy, defaults = {
      scriptable: true,
      indexable: true
  }) {
      const { _scriptable =defaults.scriptable , _indexable =defaults.indexable , _allKeys =defaults.allKeys  } = proxy;
      return {
          allKeys: _allKeys,
          scriptable: _scriptable,
          indexable: _indexable,
          isScriptable: isFunction(_scriptable) ? _scriptable : ()=>_scriptable,
          isIndexable: isFunction(_indexable) ? _indexable : ()=>_indexable
      };
  }
  const readKey = (prefix, name)=>prefix ? prefix + _capitalize(name) : name;
  const needsSubResolver = (prop, value)=>isObject(value) && prop !== 'adapters' && (Object.getPrototypeOf(value) === null || value.constructor === Object);
  function _cached(target, prop, resolve) {
      if (Object.prototype.hasOwnProperty.call(target, prop) || prop === 'constructor') {
          return target[prop];
      }
      const value = resolve();
      // cache the resolved value
      target[prop] = value;
      return value;
  }
  function _resolveWithContext(target, prop, receiver) {
      const { _proxy , _context , _subProxy , _descriptors: descriptors  } = target;
      let value = _proxy[prop]; // resolve from proxy
      // resolve with context
      if (isFunction(value) && descriptors.isScriptable(prop)) {
          value = _resolveScriptable(prop, value, target, receiver);
      }
      if (isArray(value) && value.length) {
          value = _resolveArray(prop, value, target, descriptors.isIndexable);
      }
      if (needsSubResolver(prop, value)) {
          // if the resolved value is an object, create a sub resolver for it
          value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
      }
      return value;
  }
  function _resolveScriptable(prop, getValue, target, receiver) {
      const { _proxy , _context , _subProxy , _stack  } = target;
      if (_stack.has(prop)) {
          throw new Error('Recursion detected: ' + Array.from(_stack).join('->') + '->' + prop);
      }
      _stack.add(prop);
      let value = getValue(_context, _subProxy || receiver);
      _stack.delete(prop);
      if (needsSubResolver(prop, value)) {
          // When scriptable option returns an object, create a resolver on that.
          value = createSubResolver(_proxy._scopes, _proxy, prop, value);
      }
      return value;
  }
  function _resolveArray(prop, value, target, isIndexable) {
      const { _proxy , _context , _subProxy , _descriptors: descriptors  } = target;
      if (typeof _context.index !== 'undefined' && isIndexable(prop)) {
          return value[_context.index % value.length];
      } else if (isObject(value[0])) {
          // Array of objects, return array or resolvers
          const arr = value;
          const scopes = _proxy._scopes.filter((s)=>s !== arr);
          value = [];
          for (const item of arr){
              const resolver = createSubResolver(scopes, _proxy, prop, item);
              value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
          }
      }
      return value;
  }
  function resolveFallback(fallback, prop, value) {
      return isFunction(fallback) ? fallback(prop, value) : fallback;
  }
  const getScope = (key, parent)=>key === true ? parent : typeof key === 'string' ? resolveObjectKey(parent, key) : undefined;
  function addScopes(set, parentScopes, key, parentFallback, value) {
      for (const parent of parentScopes){
          const scope = getScope(key, parent);
          if (scope) {
              set.add(scope);
              const fallback = resolveFallback(scope._fallback, key, value);
              if (typeof fallback !== 'undefined' && fallback !== key && fallback !== parentFallback) {
                  // When we reach the descriptor that defines a new _fallback, return that.
                  // The fallback will resume to that new scope.
                  return fallback;
              }
          } else if (scope === false && typeof parentFallback !== 'undefined' && key !== parentFallback) {
              // Fallback to `false` results to `false`, when falling back to different key.
              // For example `interaction` from `hover` or `plugins.tooltip` and `animation` from `animations`
              return null;
          }
      }
      return false;
  }
  function createSubResolver(parentScopes, resolver, prop, value) {
      const rootScopes = resolver._rootScopes;
      const fallback = resolveFallback(resolver._fallback, prop, value);
      const allScopes = [
          ...parentScopes,
          ...rootScopes
      ];
      const set = new Set();
      set.add(value);
      let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
      if (key === null) {
          return false;
      }
      if (typeof fallback !== 'undefined' && fallback !== prop) {
          key = addScopesFromKey(set, allScopes, fallback, key, value);
          if (key === null) {
              return false;
          }
      }
      return _createResolver(Array.from(set), [
          ''
      ], rootScopes, fallback, ()=>subGetTarget(resolver, prop, value));
  }
  function addScopesFromKey(set, allScopes, key, fallback, item) {
      while(key){
          key = addScopes(set, allScopes, key, fallback, item);
      }
      return key;
  }
  function subGetTarget(resolver, prop, value) {
      const parent = resolver._getTarget();
      if (!(prop in parent)) {
          parent[prop] = {};
      }
      const target = parent[prop];
      if (isArray(target) && isObject(value)) {
          // For array of objects, the object is used to store updated values
          return value;
      }
      return target || {};
  }
  function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
      let value;
      for (const prefix of prefixes){
          value = _resolve(readKey(prefix, prop), scopes);
          if (typeof value !== 'undefined') {
              return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
          }
      }
  }
  function _resolve(key, scopes) {
      for (const scope of scopes){
          if (!scope) {
              continue;
          }
          const value = scope[key];
          if (typeof value !== 'undefined') {
              return value;
          }
      }
  }
  function getKeysFromAllScopes(target) {
      let keys = target._keys;
      if (!keys) {
          keys = target._keys = resolveKeysFromAllScopes(target._scopes);
      }
      return keys;
  }
  function resolveKeysFromAllScopes(scopes) {
      const set = new Set();
      for (const scope of scopes){
          for (const key of Object.keys(scope).filter((k)=>!k.startsWith('_'))){
              set.add(key);
          }
      }
      return Array.from(set);
  }
  function _parseObjectDataRadialScale(meta, data, start, count) {
      const { iScale  } = meta;
      const { key ='r'  } = this._parsing;
      const parsed = new Array(count);
      let i, ilen, index, item;
      for(i = 0, ilen = count; i < ilen; ++i){
          index = i + start;
          item = data[index];
          parsed[i] = {
              r: iScale.parse(resolveObjectKey(item, key), index)
          };
      }
      return parsed;
  }

  const EPSILON = Number.EPSILON || 1e-14;
  const getPoint = (points, i)=>i < points.length && !points[i].skip && points[i];
  const getValueAxis = (indexAxis)=>indexAxis === 'x' ? 'y' : 'x';
  function splineCurve(firstPoint, middlePoint, afterPoint, t) {
      // Props to Rob Spencer at scaled innovation for his post on splining between points
      // http://scaledinnovation.com/analytics/splines/aboutSplines.html
      // This function must also respect "skipped" points
      const previous = firstPoint.skip ? middlePoint : firstPoint;
      const current = middlePoint;
      const next = afterPoint.skip ? middlePoint : afterPoint;
      const d01 = distanceBetweenPoints(current, previous);
      const d12 = distanceBetweenPoints(next, current);
      let s01 = d01 / (d01 + d12);
      let s12 = d12 / (d01 + d12);
      // If all points are the same, s01 & s02 will be inf
      s01 = isNaN(s01) ? 0 : s01;
      s12 = isNaN(s12) ? 0 : s12;
      const fa = t * s01; // scaling factor for triangle Ta
      const fb = t * s12;
      return {
          previous: {
              x: current.x - fa * (next.x - previous.x),
              y: current.y - fa * (next.y - previous.y)
          },
          next: {
              x: current.x + fb * (next.x - previous.x),
              y: current.y + fb * (next.y - previous.y)
          }
      };
  }
  /**
   * Adjust tangents to ensure monotonic properties
   */ function monotoneAdjust(points, deltaK, mK) {
      const pointsLen = points.length;
      let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
      let pointAfter = getPoint(points, 0);
      for(let i = 0; i < pointsLen - 1; ++i){
          pointCurrent = pointAfter;
          pointAfter = getPoint(points, i + 1);
          if (!pointCurrent || !pointAfter) {
              continue;
          }
          if (almostEquals(deltaK[i], 0, EPSILON)) {
              mK[i] = mK[i + 1] = 0;
              continue;
          }
          alphaK = mK[i] / deltaK[i];
          betaK = mK[i + 1] / deltaK[i];
          squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
          if (squaredMagnitude <= 9) {
              continue;
          }
          tauK = 3 / Math.sqrt(squaredMagnitude);
          mK[i] = alphaK * tauK * deltaK[i];
          mK[i + 1] = betaK * tauK * deltaK[i];
      }
  }
  function monotoneCompute(points, mK, indexAxis = 'x') {
      const valueAxis = getValueAxis(indexAxis);
      const pointsLen = points.length;
      let delta, pointBefore, pointCurrent;
      let pointAfter = getPoint(points, 0);
      for(let i = 0; i < pointsLen; ++i){
          pointBefore = pointCurrent;
          pointCurrent = pointAfter;
          pointAfter = getPoint(points, i + 1);
          if (!pointCurrent) {
              continue;
          }
          const iPixel = pointCurrent[indexAxis];
          const vPixel = pointCurrent[valueAxis];
          if (pointBefore) {
              delta = (iPixel - pointBefore[indexAxis]) / 3;
              pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
              pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
          }
          if (pointAfter) {
              delta = (pointAfter[indexAxis] - iPixel) / 3;
              pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
              pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
          }
      }
  }
  /**
   * This function calculates Bézier control points in a similar way than |splineCurve|,
   * but preserves monotonicity of the provided data and ensures no local extremums are added
   * between the dataset discrete points due to the interpolation.
   * See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
   */ function splineCurveMonotone(points, indexAxis = 'x') {
      const valueAxis = getValueAxis(indexAxis);
      const pointsLen = points.length;
      const deltaK = Array(pointsLen).fill(0);
      const mK = Array(pointsLen);
      // Calculate slopes (deltaK) and initialize tangents (mK)
      let i, pointBefore, pointCurrent;
      let pointAfter = getPoint(points, 0);
      for(i = 0; i < pointsLen; ++i){
          pointBefore = pointCurrent;
          pointCurrent = pointAfter;
          pointAfter = getPoint(points, i + 1);
          if (!pointCurrent) {
              continue;
          }
          if (pointAfter) {
              const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
              // In the case of two points that appear at the same x pixel, slopeDeltaX is 0
              deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
          }
          mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
      }
      monotoneAdjust(points, deltaK, mK);
      monotoneCompute(points, mK, indexAxis);
  }
  function capControlPoint(pt, min, max) {
      return Math.max(Math.min(pt, max), min);
  }
  function capBezierPoints(points, area) {
      let i, ilen, point, inArea, inAreaPrev;
      let inAreaNext = _isPointInArea(points[0], area);
      for(i = 0, ilen = points.length; i < ilen; ++i){
          inAreaPrev = inArea;
          inArea = inAreaNext;
          inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
          if (!inArea) {
              continue;
          }
          point = points[i];
          if (inAreaPrev) {
              point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
              point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
          }
          if (inAreaNext) {
              point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
              point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
          }
      }
  }
  /**
   * @private
   */ function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
      let i, ilen, point, controlPoints;
      // Only consider points that are drawn in case the spanGaps option is used
      if (options.spanGaps) {
          points = points.filter((pt)=>!pt.skip);
      }
      if (options.cubicInterpolationMode === 'monotone') {
          splineCurveMonotone(points, indexAxis);
      } else {
          let prev = loop ? points[points.length - 1] : points[0];
          for(i = 0, ilen = points.length; i < ilen; ++i){
              point = points[i];
              controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
              point.cp1x = controlPoints.previous.x;
              point.cp1y = controlPoints.previous.y;
              point.cp2x = controlPoints.next.x;
              point.cp2y = controlPoints.next.y;
              prev = point;
          }
      }
      if (options.capBezierPoints) {
          capBezierPoints(points, area);
      }
  }

  /**
   * @private
   */ function _isDomSupported() {
      return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
  /**
   * @private
   */ function _getParentNode(domNode) {
      let parent = domNode.parentNode;
      if (parent && parent.toString() === '[object ShadowRoot]') {
          parent = parent.host;
      }
      return parent;
  }
  /**
   * convert max-width/max-height values that may be percentages into a number
   * @private
   */ function parseMaxStyle(styleValue, node, parentProperty) {
      let valueInPixels;
      if (typeof styleValue === 'string') {
          valueInPixels = parseInt(styleValue, 10);
          if (styleValue.indexOf('%') !== -1) {
              // percentage * size in dimension
              valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
          }
      } else {
          valueInPixels = styleValue;
      }
      return valueInPixels;
  }
  const getComputedStyle = (element)=>element.ownerDocument.defaultView.getComputedStyle(element, null);
  function getStyle(el, property) {
      return getComputedStyle(el).getPropertyValue(property);
  }
  const positions = [
      'top',
      'right',
      'bottom',
      'left'
  ];
  function getPositionedStyle(styles, style, suffix) {
      const result = {};
      suffix = suffix ? '-' + suffix : '';
      for(let i = 0; i < 4; i++){
          const pos = positions[i];
          result[pos] = parseFloat(styles[style + '-' + pos + suffix]) || 0;
      }
      result.width = result.left + result.right;
      result.height = result.top + result.bottom;
      return result;
  }
  const useOffsetPos = (x, y, target)=>(x > 0 || y > 0) && (!target || !target.shadowRoot);
  /**
   * @param e
   * @param canvas
   * @returns Canvas position
   */ function getCanvasPosition(e, canvas) {
      const touches = e.touches;
      const source = touches && touches.length ? touches[0] : e;
      const { offsetX , offsetY  } = source;
      let box = false;
      let x, y;
      if (useOffsetPos(offsetX, offsetY, e.target)) {
          x = offsetX;
          y = offsetY;
      } else {
          const rect = canvas.getBoundingClientRect();
          x = source.clientX - rect.left;
          y = source.clientY - rect.top;
          box = true;
      }
      return {
          x,
          y,
          box
      };
  }
  /**
   * Gets an event's x, y coordinates, relative to the chart area
   * @param event
   * @param chart
   * @returns x and y coordinates of the event
   */ function getRelativePosition(event, chart) {
      if ('native' in event) {
          return event;
      }
      const { canvas , currentDevicePixelRatio  } = chart;
      const style = getComputedStyle(canvas);
      const borderBox = style.boxSizing === 'border-box';
      const paddings = getPositionedStyle(style, 'padding');
      const borders = getPositionedStyle(style, 'border', 'width');
      const { x , y , box  } = getCanvasPosition(event, canvas);
      const xOffset = paddings.left + (box && borders.left);
      const yOffset = paddings.top + (box && borders.top);
      let { width , height  } = chart;
      if (borderBox) {
          width -= paddings.width + borders.width;
          height -= paddings.height + borders.height;
      }
      return {
          x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
          y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
      };
  }
  function getContainerSize(canvas, width, height) {
      let maxWidth, maxHeight;
      if (width === undefined || height === undefined) {
          const container = canvas && _getParentNode(canvas);
          if (!container) {
              width = canvas.clientWidth;
              height = canvas.clientHeight;
          } else {
              const rect = container.getBoundingClientRect(); // this is the border box of the container
              const containerStyle = getComputedStyle(container);
              const containerBorder = getPositionedStyle(containerStyle, 'border', 'width');
              const containerPadding = getPositionedStyle(containerStyle, 'padding');
              width = rect.width - containerPadding.width - containerBorder.width;
              height = rect.height - containerPadding.height - containerBorder.height;
              maxWidth = parseMaxStyle(containerStyle.maxWidth, container, 'clientWidth');
              maxHeight = parseMaxStyle(containerStyle.maxHeight, container, 'clientHeight');
          }
      }
      return {
          width,
          height,
          maxWidth: maxWidth || INFINITY,
          maxHeight: maxHeight || INFINITY
      };
  }
  const round1 = (v)=>Math.round(v * 10) / 10;
  // eslint-disable-next-line complexity
  function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
      const style = getComputedStyle(canvas);
      const margins = getPositionedStyle(style, 'margin');
      const maxWidth = parseMaxStyle(style.maxWidth, canvas, 'clientWidth') || INFINITY;
      const maxHeight = parseMaxStyle(style.maxHeight, canvas, 'clientHeight') || INFINITY;
      const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
      let { width , height  } = containerSize;
      if (style.boxSizing === 'content-box') {
          const borders = getPositionedStyle(style, 'border', 'width');
          const paddings = getPositionedStyle(style, 'padding');
          width -= paddings.width + borders.width;
          height -= paddings.height + borders.height;
      }
      width = Math.max(0, width - margins.width);
      height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
      width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
      height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
      if (width && !height) {
          // https://github.com/chartjs/Chart.js/issues/4659
          // If the canvas has width, but no height, default to aspectRatio of 2 (canvas default)
          height = round1(width / 2);
      }
      const maintainHeight = bbWidth !== undefined || bbHeight !== undefined;
      if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
          height = containerSize.height;
          width = round1(Math.floor(height * aspectRatio));
      }
      return {
          width,
          height
      };
  }
  /**
   * @param chart
   * @param forceRatio
   * @param forceStyle
   * @returns True if the canvas context size or transformation has changed.
   */ function retinaScale(chart, forceRatio, forceStyle) {
      const pixelRatio = forceRatio || 1;
      const deviceHeight = Math.floor(chart.height * pixelRatio);
      const deviceWidth = Math.floor(chart.width * pixelRatio);
      chart.height = Math.floor(chart.height);
      chart.width = Math.floor(chart.width);
      const canvas = chart.canvas;
      // If no style has been set on the canvas, the render size is used as display size,
      // making the chart visually bigger, so let's enforce it to the "correct" values.
      // See https://github.com/chartjs/Chart.js/issues/3575
      if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
          canvas.style.height = `${chart.height}px`;
          canvas.style.width = `${chart.width}px`;
      }
      if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
          chart.currentDevicePixelRatio = pixelRatio;
          canvas.height = deviceHeight;
          canvas.width = deviceWidth;
          chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          return true;
      }
      return false;
  }
  /**
   * Detects support for options object argument in addEventListener.
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
   * @private
   */ const supportsEventListenerOptions = function() {
      let passiveSupported = false;
      try {
          const options = {
              get passive () {
                  passiveSupported = true;
                  return false;
              }
          };
          if (_isDomSupported()) {
              window.addEventListener('test', null, options);
              window.removeEventListener('test', null, options);
          }
      } catch (e) {
      // continue regardless of error
      }
      return passiveSupported;
  }();
  /**
   * The "used" size is the final value of a dimension property after all calculations have
   * been performed. This method uses the computed style of `element` but returns undefined
   * if the computed style is not expressed in pixels. That can happen in some cases where
   * `element` has a size relative to its parent and this last one is not yet displayed,
   * for example because of `display: none` on a parent node.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
   * @returns Size in pixels or undefined if unknown.
   */ function readUsedSize(element, property) {
      const value = getStyle(element, property);
      const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
      return matches ? +matches[1] : undefined;
  }

  /**
   * @private
   */ function _pointInLine(p1, p2, t, mode) {
      return {
          x: p1.x + t * (p2.x - p1.x),
          y: p1.y + t * (p2.y - p1.y)
      };
  }
  /**
   * @private
   */ function _steppedInterpolation(p1, p2, t, mode) {
      return {
          x: p1.x + t * (p2.x - p1.x),
          y: mode === 'middle' ? t < 0.5 ? p1.y : p2.y : mode === 'after' ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
      };
  }
  /**
   * @private
   */ function _bezierInterpolation(p1, p2, t, mode) {
      const cp1 = {
          x: p1.cp2x,
          y: p1.cp2y
      };
      const cp2 = {
          x: p2.cp1x,
          y: p2.cp1y
      };
      const a = _pointInLine(p1, cp1, t);
      const b = _pointInLine(cp1, cp2, t);
      const c = _pointInLine(cp2, p2, t);
      const d = _pointInLine(a, b, t);
      const e = _pointInLine(b, c, t);
      return _pointInLine(d, e, t);
  }

  const getRightToLeftAdapter = function(rectX, width) {
      return {
          x (x) {
              return rectX + rectX + width - x;
          },
          setWidth (w) {
              width = w;
          },
          textAlign (align) {
              if (align === 'center') {
                  return align;
              }
              return align === 'right' ? 'left' : 'right';
          },
          xPlus (x, value) {
              return x - value;
          },
          leftForLtr (x, itemWidth) {
              return x - itemWidth;
          }
      };
  };
  const getLeftToRightAdapter = function() {
      return {
          x (x) {
              return x;
          },
          setWidth (w) {},
          textAlign (align) {
              return align;
          },
          xPlus (x, value) {
              return x + value;
          },
          leftForLtr (x, _itemWidth) {
              return x;
          }
      };
  };
  function getRtlAdapter(rtl, rectX, width) {
      return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
  }
  function overrideTextDirection(ctx, direction) {
      let style, original;
      if (direction === 'ltr' || direction === 'rtl') {
          style = ctx.canvas.style;
          original = [
              style.getPropertyValue('direction'),
              style.getPropertyPriority('direction')
          ];
          style.setProperty('direction', direction, 'important');
          ctx.prevTextDirection = original;
      }
  }
  function restoreTextDirection(ctx, original) {
      if (original !== undefined) {
          delete ctx.prevTextDirection;
          ctx.canvas.style.setProperty('direction', original[0], original[1]);
      }
  }

  function propertyFn(property) {
      if (property === 'angle') {
          return {
              between: _angleBetween,
              compare: _angleDiff,
              normalize: _normalizeAngle
          };
      }
      return {
          between: _isBetween,
          compare: (a, b)=>a - b,
          normalize: (x)=>x
      };
  }
  function normalizeSegment({ start , end , count , loop , style  }) {
      return {
          start: start % count,
          end: end % count,
          loop: loop && (end - start + 1) % count === 0,
          style
      };
  }
  function getSegment(segment, points, bounds) {
      const { property , start: startBound , end: endBound  } = bounds;
      const { between , normalize  } = propertyFn(property);
      const count = points.length;
      let { start , end , loop  } = segment;
      let i, ilen;
      if (loop) {
          start += count;
          end += count;
          for(i = 0, ilen = count; i < ilen; ++i){
              if (!between(normalize(points[start % count][property]), startBound, endBound)) {
                  break;
              }
              start--;
              end--;
          }
          start %= count;
          end %= count;
      }
      if (end < start) {
          end += count;
      }
      return {
          start,
          end,
          loop,
          style: segment.style
      };
  }
   function _boundSegment(segment, points, bounds) {
      if (!bounds) {
          return [
              segment
          ];
      }
      const { property , start: startBound , end: endBound  } = bounds;
      const count = points.length;
      const { compare , between , normalize  } = propertyFn(property);
      const { start , end , loop , style  } = getSegment(segment, points, bounds);
      const result = [];
      let inside = false;
      let subStart = null;
      let value, point, prevValue;
      const startIsBefore = ()=>between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
      const endIsBefore = ()=>compare(endBound, value) === 0 || between(endBound, prevValue, value);
      const shouldStart = ()=>inside || startIsBefore();
      const shouldStop = ()=>!inside || endIsBefore();
      for(let i = start, prev = start; i <= end; ++i){
          point = points[i % count];
          if (point.skip) {
              continue;
          }
          value = normalize(point[property]);
          if (value === prevValue) {
              continue;
          }
          inside = between(value, startBound, endBound);
          if (subStart === null && shouldStart()) {
              subStart = compare(value, startBound) === 0 ? i : prev;
          }
          if (subStart !== null && shouldStop()) {
              result.push(normalizeSegment({
                  start: subStart,
                  end: i,
                  loop,
                  count,
                  style
              }));
              subStart = null;
          }
          prev = i;
          prevValue = value;
      }
      if (subStart !== null) {
          result.push(normalizeSegment({
              start: subStart,
              end,
              loop,
              count,
              style
          }));
      }
      return result;
  }
   function _boundSegments(line, bounds) {
      const result = [];
      const segments = line.segments;
      for(let i = 0; i < segments.length; i++){
          const sub = _boundSegment(segments[i], line.points, bounds);
          if (sub.length) {
              result.push(...sub);
          }
      }
      return result;
  }
   function findStartAndEnd(points, count, loop, spanGaps) {
      let start = 0;
      let end = count - 1;
      if (loop && !spanGaps) {
          while(start < count && !points[start].skip){
              start++;
          }
      }
      while(start < count && points[start].skip){
          start++;
      }
      start %= count;
      if (loop) {
          end += start;
      }
      while(end > start && points[end % count].skip){
          end--;
      }
      end %= count;
      return {
          start,
          end
      };
  }
   function solidSegments(points, start, max, loop) {
      const count = points.length;
      const result = [];
      let last = start;
      let prev = points[start];
      let end;
      for(end = start + 1; end <= max; ++end){
          const cur = points[end % count];
          if (cur.skip || cur.stop) {
              if (!prev.skip) {
                  loop = false;
                  result.push({
                      start: start % count,
                      end: (end - 1) % count,
                      loop
                  });
                  start = last = cur.stop ? end : null;
              }
          } else {
              last = end;
              if (prev.skip) {
                  start = end;
              }
          }
          prev = cur;
      }
      if (last !== null) {
          result.push({
              start: start % count,
              end: last % count,
              loop
          });
      }
      return result;
  }
   function _computeSegments(line, segmentOptions) {
      const points = line.points;
      const spanGaps = line.options.spanGaps;
      const count = points.length;
      if (!count) {
          return [];
      }
      const loop = !!line._loop;
      const { start , end  } = findStartAndEnd(points, count, loop, spanGaps);
      if (spanGaps === true) {
          return splitByStyles(line, [
              {
                  start,
                  end,
                  loop
              }
          ], points, segmentOptions);
      }
      const max = end < start ? end + count : end;
      const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
      return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
  }
   function splitByStyles(line, segments, points, segmentOptions) {
      if (!segmentOptions || !segmentOptions.setContext || !points) {
          return segments;
      }
      return doSplitByStyles(line, segments, points, segmentOptions);
  }
   function doSplitByStyles(line, segments, points, segmentOptions) {
      const chartContext = line._chart.getContext();
      const baseStyle = readStyle(line.options);
      const { _datasetIndex: datasetIndex , options: { spanGaps  }  } = line;
      const count = points.length;
      const result = [];
      let prevStyle = baseStyle;
      let start = segments[0].start;
      let i = start;
      function addStyle(s, e, l, st) {
          const dir = spanGaps ? -1 : 1;
          if (s === e) {
              return;
          }
          s += count;
          while(points[s % count].skip){
              s -= dir;
          }
          while(points[e % count].skip){
              e += dir;
          }
          if (s % count !== e % count) {
              result.push({
                  start: s % count,
                  end: e % count,
                  loop: l,
                  style: st
              });
              prevStyle = st;
              start = e % count;
          }
      }
      for (const segment of segments){
          start = spanGaps ? start : segment.start;
          let prev = points[start % count];
          let style;
          for(i = start + 1; i <= segment.end; i++){
              const pt = points[i % count];
              style = readStyle(segmentOptions.setContext(createContext(chartContext, {
                  type: 'segment',
                  p0: prev,
                  p1: pt,
                  p0DataIndex: (i - 1) % count,
                  p1DataIndex: i % count,
                  datasetIndex
              })));
              if (styleChanged(style, prevStyle)) {
                  addStyle(start, i - 1, segment.loop, prevStyle);
              }
              prev = pt;
              prevStyle = style;
          }
          if (start < i - 1) {
              addStyle(start, i - 1, segment.loop, prevStyle);
          }
      }
      return result;
  }
  function readStyle(options) {
      return {
          backgroundColor: options.backgroundColor,
          borderCapStyle: options.borderCapStyle,
          borderDash: options.borderDash,
          borderDashOffset: options.borderDashOffset,
          borderJoinStyle: options.borderJoinStyle,
          borderWidth: options.borderWidth,
          borderColor: options.borderColor
      };
  }
  function styleChanged(style, prevStyle) {
      if (!prevStyle) {
          return false;
      }
      const cache = [];
      const replacer = function(key, value) {
          if (!isPatternOrGradient(value)) {
              return value;
          }
          if (!cache.includes(value)) {
              cache.push(value);
          }
          return cache.indexOf(value);
      };
      return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
  }

  function getSizeForArea(scale, chartArea, field) {
      return scale.options.clip ? scale[field] : chartArea[field];
  }
  function getDatasetArea(meta, chartArea) {
      const { xScale , yScale  } = meta;
      if (xScale && yScale) {
          return {
              left: getSizeForArea(xScale, chartArea, 'left'),
              right: getSizeForArea(xScale, chartArea, 'right'),
              top: getSizeForArea(yScale, chartArea, 'top'),
              bottom: getSizeForArea(yScale, chartArea, 'bottom')
          };
      }
      return chartArea;
  }
  function getDatasetClipArea(chart, meta) {
      const clip = meta._clip;
      if (clip.disabled) {
          return false;
      }
      const area = getDatasetArea(meta, chart.chartArea);
      return {
          left: clip.left === false ? 0 : area.left - (clip.left === true ? 0 : clip.left),
          right: clip.right === false ? chart.width : area.right + (clip.right === true ? 0 : clip.right),
          top: clip.top === false ? 0 : area.top - (clip.top === true ? 0 : clip.top),
          bottom: clip.bottom === false ? chart.height : area.bottom + (clip.bottom === true ? 0 : clip.bottom)
      };
  }

  /*!
   * Chart.js v4.4.9
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   */

  class Animator {
      constructor(){
          this._request = null;
          this._charts = new Map();
          this._running = false;
          this._lastDate = undefined;
      }
   _notify(chart, anims, date, type) {
          const callbacks = anims.listeners[type];
          const numSteps = anims.duration;
          callbacks.forEach((fn)=>fn({
                  chart,
                  initial: anims.initial,
                  numSteps,
                  currentStep: Math.min(date - anims.start, numSteps)
              }));
      }
   _refresh() {
          if (this._request) {
              return;
          }
          this._running = true;
          this._request = requestAnimFrame.call(window, ()=>{
              this._update();
              this._request = null;
              if (this._running) {
                  this._refresh();
              }
          });
      }
   _update(date = Date.now()) {
          let remaining = 0;
          this._charts.forEach((anims, chart)=>{
              if (!anims.running || !anims.items.length) {
                  return;
              }
              const items = anims.items;
              let i = items.length - 1;
              let draw = false;
              let item;
              for(; i >= 0; --i){
                  item = items[i];
                  if (item._active) {
                      if (item._total > anims.duration) {
                          anims.duration = item._total;
                      }
                      item.tick(date);
                      draw = true;
                  } else {
                      items[i] = items[items.length - 1];
                      items.pop();
                  }
              }
              if (draw) {
                  chart.draw();
                  this._notify(chart, anims, date, 'progress');
              }
              if (!items.length) {
                  anims.running = false;
                  this._notify(chart, anims, date, 'complete');
                  anims.initial = false;
              }
              remaining += items.length;
          });
          this._lastDate = date;
          if (remaining === 0) {
              this._running = false;
          }
      }
   _getAnims(chart) {
          const charts = this._charts;
          let anims = charts.get(chart);
          if (!anims) {
              anims = {
                  running: false,
                  initial: true,
                  items: [],
                  listeners: {
                      complete: [],
                      progress: []
                  }
              };
              charts.set(chart, anims);
          }
          return anims;
      }
   listen(chart, event, cb) {
          this._getAnims(chart).listeners[event].push(cb);
      }
   add(chart, items) {
          if (!items || !items.length) {
              return;
          }
          this._getAnims(chart).items.push(...items);
      }
   has(chart) {
          return this._getAnims(chart).items.length > 0;
      }
   start(chart) {
          const anims = this._charts.get(chart);
          if (!anims) {
              return;
          }
          anims.running = true;
          anims.start = Date.now();
          anims.duration = anims.items.reduce((acc, cur)=>Math.max(acc, cur._duration), 0);
          this._refresh();
      }
      running(chart) {
          if (!this._running) {
              return false;
          }
          const anims = this._charts.get(chart);
          if (!anims || !anims.running || !anims.items.length) {
              return false;
          }
          return true;
      }
   stop(chart) {
          const anims = this._charts.get(chart);
          if (!anims || !anims.items.length) {
              return;
          }
          const items = anims.items;
          let i = items.length - 1;
          for(; i >= 0; --i){
              items[i].cancel();
          }
          anims.items = [];
          this._notify(chart, anims, Date.now(), 'complete');
      }
   remove(chart) {
          return this._charts.delete(chart);
      }
  }
  var animator = /* #__PURE__ */ new Animator();

  const transparent = 'transparent';
  const interpolators = {
      boolean (from, to, factor) {
          return factor > 0.5 ? to : from;
      },
   color (from, to, factor) {
          const c0 = color(from || transparent);
          const c1 = c0.valid && color(to || transparent);
          return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
      },
      number (from, to, factor) {
          return from + (to - from) * factor;
      }
  };
  class Animation {
      constructor(cfg, target, prop, to){
          const currentValue = target[prop];
          to = resolve([
              cfg.to,
              to,
              currentValue,
              cfg.from
          ]);
          const from = resolve([
              cfg.from,
              currentValue,
              to
          ]);
          this._active = true;
          this._fn = cfg.fn || interpolators[cfg.type || typeof from];
          this._easing = effects[cfg.easing] || effects.linear;
          this._start = Math.floor(Date.now() + (cfg.delay || 0));
          this._duration = this._total = Math.floor(cfg.duration);
          this._loop = !!cfg.loop;
          this._target = target;
          this._prop = prop;
          this._from = from;
          this._to = to;
          this._promises = undefined;
      }
      active() {
          return this._active;
      }
      update(cfg, to, date) {
          if (this._active) {
              this._notify(false);
              const currentValue = this._target[this._prop];
              const elapsed = date - this._start;
              const remain = this._duration - elapsed;
              this._start = date;
              this._duration = Math.floor(Math.max(remain, cfg.duration));
              this._total += elapsed;
              this._loop = !!cfg.loop;
              this._to = resolve([
                  cfg.to,
                  to,
                  currentValue,
                  cfg.from
              ]);
              this._from = resolve([
                  cfg.from,
                  currentValue,
                  to
              ]);
          }
      }
      cancel() {
          if (this._active) {
              this.tick(Date.now());
              this._active = false;
              this._notify(false);
          }
      }
      tick(date) {
          const elapsed = date - this._start;
          const duration = this._duration;
          const prop = this._prop;
          const from = this._from;
          const loop = this._loop;
          const to = this._to;
          let factor;
          this._active = from !== to && (loop || elapsed < duration);
          if (!this._active) {
              this._target[prop] = to;
              this._notify(true);
              return;
          }
          if (elapsed < 0) {
              this._target[prop] = from;
              return;
          }
          factor = elapsed / duration % 2;
          factor = loop && factor > 1 ? 2 - factor : factor;
          factor = this._easing(Math.min(1, Math.max(0, factor)));
          this._target[prop] = this._fn(from, to, factor);
      }
      wait() {
          const promises = this._promises || (this._promises = []);
          return new Promise((res, rej)=>{
              promises.push({
                  res,
                  rej
              });
          });
      }
      _notify(resolved) {
          const method = resolved ? 'res' : 'rej';
          const promises = this._promises || [];
          for(let i = 0; i < promises.length; i++){
              promises[i][method]();
          }
      }
  }

  class Animations {
      constructor(chart, config){
          this._chart = chart;
          this._properties = new Map();
          this.configure(config);
      }
      configure(config) {
          if (!isObject(config)) {
              return;
          }
          const animationOptions = Object.keys(defaults.animation);
          const animatedProps = this._properties;
          Object.getOwnPropertyNames(config).forEach((key)=>{
              const cfg = config[key];
              if (!isObject(cfg)) {
                  return;
              }
              const resolved = {};
              for (const option of animationOptions){
                  resolved[option] = cfg[option];
              }
              (isArray(cfg.properties) && cfg.properties || [
                  key
              ]).forEach((prop)=>{
                  if (prop === key || !animatedProps.has(prop)) {
                      animatedProps.set(prop, resolved);
                  }
              });
          });
      }
   _animateOptions(target, values) {
          const newOptions = values.options;
          const options = resolveTargetOptions(target, newOptions);
          if (!options) {
              return [];
          }
          const animations = this._createAnimations(options, newOptions);
          if (newOptions.$shared) {
              awaitAll(target.options.$animations, newOptions).then(()=>{
                  target.options = newOptions;
              }, ()=>{
              });
          }
          return animations;
      }
   _createAnimations(target, values) {
          const animatedProps = this._properties;
          const animations = [];
          const running = target.$animations || (target.$animations = {});
          const props = Object.keys(values);
          const date = Date.now();
          let i;
          for(i = props.length - 1; i >= 0; --i){
              const prop = props[i];
              if (prop.charAt(0) === '$') {
                  continue;
              }
              if (prop === 'options') {
                  animations.push(...this._animateOptions(target, values));
                  continue;
              }
              const value = values[prop];
              let animation = running[prop];
              const cfg = animatedProps.get(prop);
              if (animation) {
                  if (cfg && animation.active()) {
                      animation.update(cfg, value, date);
                      continue;
                  } else {
                      animation.cancel();
                  }
              }
              if (!cfg || !cfg.duration) {
                  target[prop] = value;
                  continue;
              }
              running[prop] = animation = new Animation(cfg, target, prop, value);
              animations.push(animation);
          }
          return animations;
      }
   update(target, values) {
          if (this._properties.size === 0) {
              Object.assign(target, values);
              return;
          }
          const animations = this._createAnimations(target, values);
          if (animations.length) {
              animator.add(this._chart, animations);
              return true;
          }
      }
  }
  function awaitAll(animations, properties) {
      const running = [];
      const keys = Object.keys(properties);
      for(let i = 0; i < keys.length; i++){
          const anim = animations[keys[i]];
          if (anim && anim.active()) {
              running.push(anim.wait());
          }
      }
      return Promise.all(running);
  }
  function resolveTargetOptions(target, newOptions) {
      if (!newOptions) {
          return;
      }
      let options = target.options;
      if (!options) {
          target.options = newOptions;
          return;
      }
      if (options.$shared) {
          target.options = options = Object.assign({}, options, {
              $shared: false,
              $animations: {}
          });
      }
      return options;
  }

  function scaleClip(scale, allowedOverflow) {
      const opts = scale && scale.options || {};
      const reverse = opts.reverse;
      const min = opts.min === undefined ? allowedOverflow : 0;
      const max = opts.max === undefined ? allowedOverflow : 0;
      return {
          start: reverse ? max : min,
          end: reverse ? min : max
      };
  }
  function defaultClip(xScale, yScale, allowedOverflow) {
      if (allowedOverflow === false) {
          return false;
      }
      const x = scaleClip(xScale, allowedOverflow);
      const y = scaleClip(yScale, allowedOverflow);
      return {
          top: y.end,
          right: x.end,
          bottom: y.start,
          left: x.start
      };
  }
  function toClip(value) {
      let t, r, b, l;
      if (isObject(value)) {
          t = value.top;
          r = value.right;
          b = value.bottom;
          l = value.left;
      } else {
          t = r = b = l = value;
      }
      return {
          top: t,
          right: r,
          bottom: b,
          left: l,
          disabled: value === false
      };
  }
  function getSortedDatasetIndices(chart, filterVisible) {
      const keys = [];
      const metasets = chart._getSortedDatasetMetas(filterVisible);
      let i, ilen;
      for(i = 0, ilen = metasets.length; i < ilen; ++i){
          keys.push(metasets[i].index);
      }
      return keys;
  }
  function applyStack(stack, value, dsIndex, options = {}) {
      const keys = stack.keys;
      const singleMode = options.mode === 'single';
      let i, ilen, datasetIndex, otherValue;
      if (value === null) {
          return;
      }
      let found = false;
      for(i = 0, ilen = keys.length; i < ilen; ++i){
          datasetIndex = +keys[i];
          if (datasetIndex === dsIndex) {
              found = true;
              if (options.all) {
                  continue;
              }
              break;
          }
          otherValue = stack.values[datasetIndex];
          if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
              value += otherValue;
          }
      }
      if (!found && !options.all) {
          return 0;
      }
      return value;
  }
  function convertObjectDataToArray(data, meta) {
      const { iScale , vScale  } = meta;
      const iAxisKey = iScale.axis === 'x' ? 'x' : 'y';
      const vAxisKey = vScale.axis === 'x' ? 'x' : 'y';
      const keys = Object.keys(data);
      const adata = new Array(keys.length);
      let i, ilen, key;
      for(i = 0, ilen = keys.length; i < ilen; ++i){
          key = keys[i];
          adata[i] = {
              [iAxisKey]: key,
              [vAxisKey]: data[key]
          };
      }
      return adata;
  }
  function isStacked(scale, meta) {
      const stacked = scale && scale.options.stacked;
      return stacked || stacked === undefined && meta.stack !== undefined;
  }
  function getStackKey(indexScale, valueScale, meta) {
      return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
  }
  function getUserBounds(scale) {
      const { min , max , minDefined , maxDefined  } = scale.getUserBounds();
      return {
          min: minDefined ? min : Number.NEGATIVE_INFINITY,
          max: maxDefined ? max : Number.POSITIVE_INFINITY
      };
  }
  function getOrCreateStack(stacks, stackKey, indexValue) {
      const subStack = stacks[stackKey] || (stacks[stackKey] = {});
      return subStack[indexValue] || (subStack[indexValue] = {});
  }
  function getLastIndexInStack(stack, vScale, positive, type) {
      for (const meta of vScale.getMatchingVisibleMetas(type).reverse()){
          const value = stack[meta.index];
          if (positive && value > 0 || !positive && value < 0) {
              return meta.index;
          }
      }
      return null;
  }
  function updateStacks(controller, parsed) {
      const { chart , _cachedMeta: meta  } = controller;
      const stacks = chart._stacks || (chart._stacks = {});
      const { iScale , vScale , index: datasetIndex  } = meta;
      const iAxis = iScale.axis;
      const vAxis = vScale.axis;
      const key = getStackKey(iScale, vScale, meta);
      const ilen = parsed.length;
      let stack;
      for(let i = 0; i < ilen; ++i){
          const item = parsed[i];
          const { [iAxis]: index , [vAxis]: value  } = item;
          const itemStacks = item._stacks || (item._stacks = {});
          stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
          stack[datasetIndex] = value;
          stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
          stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
          const visualValues = stack._visualValues || (stack._visualValues = {});
          visualValues[datasetIndex] = value;
      }
  }
  function getFirstScaleId(chart, axis) {
      const scales = chart.scales;
      return Object.keys(scales).filter((key)=>scales[key].axis === axis).shift();
  }
  function createDatasetContext(parent, index) {
      return createContext(parent, {
          active: false,
          dataset: undefined,
          datasetIndex: index,
          index,
          mode: 'default',
          type: 'dataset'
      });
  }
  function createDataContext(parent, index, element) {
      return createContext(parent, {
          active: false,
          dataIndex: index,
          parsed: undefined,
          raw: undefined,
          element,
          index,
          mode: 'default',
          type: 'data'
      });
  }
  function clearStacks(meta, items) {
      const datasetIndex = meta.controller.index;
      const axis = meta.vScale && meta.vScale.axis;
      if (!axis) {
          return;
      }
      items = items || meta._parsed;
      for (const parsed of items){
          const stacks = parsed._stacks;
          if (!stacks || stacks[axis] === undefined || stacks[axis][datasetIndex] === undefined) {
              return;
          }
          delete stacks[axis][datasetIndex];
          if (stacks[axis]._visualValues !== undefined && stacks[axis]._visualValues[datasetIndex] !== undefined) {
              delete stacks[axis]._visualValues[datasetIndex];
          }
      }
  }
  const isDirectUpdateMode = (mode)=>mode === 'reset' || mode === 'none';
  const cloneIfNotShared = (cached, shared)=>shared ? cached : Object.assign({}, cached);
  const createStack = (canStack, meta, chart)=>canStack && !meta.hidden && meta._stacked && {
          keys: getSortedDatasetIndices(chart, true),
          values: null
      };
  class DatasetController {
   static defaults = {};
   static datasetElementType = null;
   static dataElementType = null;
   constructor(chart, datasetIndex){
          this.chart = chart;
          this._ctx = chart.ctx;
          this.index = datasetIndex;
          this._cachedDataOpts = {};
          this._cachedMeta = this.getMeta();
          this._type = this._cachedMeta.type;
          this.options = undefined;
           this._parsing = false;
          this._data = undefined;
          this._objectData = undefined;
          this._sharedOptions = undefined;
          this._drawStart = undefined;
          this._drawCount = undefined;
          this.enableOptionSharing = false;
          this.supportsDecimation = false;
          this.$context = undefined;
          this._syncList = [];
          this.datasetElementType = new.target.datasetElementType;
          this.dataElementType = new.target.dataElementType;
          this.initialize();
      }
      initialize() {
          const meta = this._cachedMeta;
          this.configure();
          this.linkScales();
          meta._stacked = isStacked(meta.vScale, meta);
          this.addElements();
          if (this.options.fill && !this.chart.isPluginEnabled('filler')) {
              console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
          }
      }
      updateIndex(datasetIndex) {
          if (this.index !== datasetIndex) {
              clearStacks(this._cachedMeta);
          }
          this.index = datasetIndex;
      }
      linkScales() {
          const chart = this.chart;
          const meta = this._cachedMeta;
          const dataset = this.getDataset();
          const chooseId = (axis, x, y, r)=>axis === 'x' ? x : axis === 'r' ? r : y;
          const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, 'x'));
          const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, 'y'));
          const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, 'r'));
          const indexAxis = meta.indexAxis;
          const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
          const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
          meta.xScale = this.getScaleForId(xid);
          meta.yScale = this.getScaleForId(yid);
          meta.rScale = this.getScaleForId(rid);
          meta.iScale = this.getScaleForId(iid);
          meta.vScale = this.getScaleForId(vid);
      }
      getDataset() {
          return this.chart.data.datasets[this.index];
      }
      getMeta() {
          return this.chart.getDatasetMeta(this.index);
      }
   getScaleForId(scaleID) {
          return this.chart.scales[scaleID];
      }
   _getOtherScale(scale) {
          const meta = this._cachedMeta;
          return scale === meta.iScale ? meta.vScale : meta.iScale;
      }
      reset() {
          this._update('reset');
      }
   _destroy() {
          const meta = this._cachedMeta;
          if (this._data) {
              unlistenArrayEvents(this._data, this);
          }
          if (meta._stacked) {
              clearStacks(meta);
          }
      }
   _dataCheck() {
          const dataset = this.getDataset();
          const data = dataset.data || (dataset.data = []);
          const _data = this._data;
          if (isObject(data)) {
              const meta = this._cachedMeta;
              this._data = convertObjectDataToArray(data, meta);
          } else if (_data !== data) {
              if (_data) {
                  unlistenArrayEvents(_data, this);
                  const meta = this._cachedMeta;
                  clearStacks(meta);
                  meta._parsed = [];
              }
              if (data && Object.isExtensible(data)) {
                  listenArrayEvents(data, this);
              }
              this._syncList = [];
              this._data = data;
          }
      }
      addElements() {
          const meta = this._cachedMeta;
          this._dataCheck();
          if (this.datasetElementType) {
              meta.dataset = new this.datasetElementType();
          }
      }
      buildOrUpdateElements(resetNewElements) {
          const meta = this._cachedMeta;
          const dataset = this.getDataset();
          let stackChanged = false;
          this._dataCheck();
          const oldStacked = meta._stacked;
          meta._stacked = isStacked(meta.vScale, meta);
          if (meta.stack !== dataset.stack) {
              stackChanged = true;
              clearStacks(meta);
              meta.stack = dataset.stack;
          }
          this._resyncElements(resetNewElements);
          if (stackChanged || oldStacked !== meta._stacked) {
              updateStacks(this, meta._parsed);
              meta._stacked = isStacked(meta.vScale, meta);
          }
      }
   configure() {
          const config = this.chart.config;
          const scopeKeys = config.datasetScopeKeys(this._type);
          const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
          this.options = config.createResolver(scopes, this.getContext());
          this._parsing = this.options.parsing;
          this._cachedDataOpts = {};
      }
   parse(start, count) {
          const { _cachedMeta: meta , _data: data  } = this;
          const { iScale , _stacked  } = meta;
          const iAxis = iScale.axis;
          let sorted = start === 0 && count === data.length ? true : meta._sorted;
          let prev = start > 0 && meta._parsed[start - 1];
          let i, cur, parsed;
          if (this._parsing === false) {
              meta._parsed = data;
              meta._sorted = true;
              parsed = data;
          } else {
              if (isArray(data[start])) {
                  parsed = this.parseArrayData(meta, data, start, count);
              } else if (isObject(data[start])) {
                  parsed = this.parseObjectData(meta, data, start, count);
              } else {
                  parsed = this.parsePrimitiveData(meta, data, start, count);
              }
              const isNotInOrderComparedToPrev = ()=>cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
              for(i = 0; i < count; ++i){
                  meta._parsed[i + start] = cur = parsed[i];
                  if (sorted) {
                      if (isNotInOrderComparedToPrev()) {
                          sorted = false;
                      }
                      prev = cur;
                  }
              }
              meta._sorted = sorted;
          }
          if (_stacked) {
              updateStacks(this, parsed);
          }
      }
   parsePrimitiveData(meta, data, start, count) {
          const { iScale , vScale  } = meta;
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          const labels = iScale.getLabels();
          const singleScale = iScale === vScale;
          const parsed = new Array(count);
          let i, ilen, index;
          for(i = 0, ilen = count; i < ilen; ++i){
              index = i + start;
              parsed[i] = {
                  [iAxis]: singleScale || iScale.parse(labels[index], index),
                  [vAxis]: vScale.parse(data[index], index)
              };
          }
          return parsed;
      }
   parseArrayData(meta, data, start, count) {
          const { xScale , yScale  } = meta;
          const parsed = new Array(count);
          let i, ilen, index, item;
          for(i = 0, ilen = count; i < ilen; ++i){
              index = i + start;
              item = data[index];
              parsed[i] = {
                  x: xScale.parse(item[0], index),
                  y: yScale.parse(item[1], index)
              };
          }
          return parsed;
      }
   parseObjectData(meta, data, start, count) {
          const { xScale , yScale  } = meta;
          const { xAxisKey ='x' , yAxisKey ='y'  } = this._parsing;
          const parsed = new Array(count);
          let i, ilen, index, item;
          for(i = 0, ilen = count; i < ilen; ++i){
              index = i + start;
              item = data[index];
              parsed[i] = {
                  x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
                  y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
              };
          }
          return parsed;
      }
   getParsed(index) {
          return this._cachedMeta._parsed[index];
      }
   getDataElement(index) {
          return this._cachedMeta.data[index];
      }
   applyStack(scale, parsed, mode) {
          const chart = this.chart;
          const meta = this._cachedMeta;
          const value = parsed[scale.axis];
          const stack = {
              keys: getSortedDatasetIndices(chart, true),
              values: parsed._stacks[scale.axis]._visualValues
          };
          return applyStack(stack, value, meta.index, {
              mode
          });
      }
   updateRangeFromParsed(range, scale, parsed, stack) {
          const parsedValue = parsed[scale.axis];
          let value = parsedValue === null ? NaN : parsedValue;
          const values = stack && parsed._stacks[scale.axis];
          if (stack && values) {
              stack.values = values;
              value = applyStack(stack, parsedValue, this._cachedMeta.index);
          }
          range.min = Math.min(range.min, value);
          range.max = Math.max(range.max, value);
      }
   getMinMax(scale, canStack) {
          const meta = this._cachedMeta;
          const _parsed = meta._parsed;
          const sorted = meta._sorted && scale === meta.iScale;
          const ilen = _parsed.length;
          const otherScale = this._getOtherScale(scale);
          const stack = createStack(canStack, meta, this.chart);
          const range = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY
          };
          const { min: otherMin , max: otherMax  } = getUserBounds(otherScale);
          let i, parsed;
          function _skip() {
              parsed = _parsed[i];
              const otherValue = parsed[otherScale.axis];
              return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
          }
          for(i = 0; i < ilen; ++i){
              if (_skip()) {
                  continue;
              }
              this.updateRangeFromParsed(range, scale, parsed, stack);
              if (sorted) {
                  break;
              }
          }
          if (sorted) {
              for(i = ilen - 1; i >= 0; --i){
                  if (_skip()) {
                      continue;
                  }
                  this.updateRangeFromParsed(range, scale, parsed, stack);
                  break;
              }
          }
          return range;
      }
      getAllParsedValues(scale) {
          const parsed = this._cachedMeta._parsed;
          const values = [];
          let i, ilen, value;
          for(i = 0, ilen = parsed.length; i < ilen; ++i){
              value = parsed[i][scale.axis];
              if (isNumberFinite(value)) {
                  values.push(value);
              }
          }
          return values;
      }
   getMaxOverflow() {
          return false;
      }
   getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const iScale = meta.iScale;
          const vScale = meta.vScale;
          const parsed = this.getParsed(index);
          return {
              label: iScale ? '' + iScale.getLabelForValue(parsed[iScale.axis]) : '',
              value: vScale ? '' + vScale.getLabelForValue(parsed[vScale.axis]) : ''
          };
      }
   _update(mode) {
          const meta = this._cachedMeta;
          this.update(mode || 'default');
          meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
      }
   update(mode) {}
      draw() {
          const ctx = this._ctx;
          const chart = this.chart;
          const meta = this._cachedMeta;
          const elements = meta.data || [];
          const area = chart.chartArea;
          const active = [];
          const start = this._drawStart || 0;
          const count = this._drawCount || elements.length - start;
          const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
          let i;
          if (meta.dataset) {
              meta.dataset.draw(ctx, area, start, count);
          }
          for(i = start; i < start + count; ++i){
              const element = elements[i];
              if (element.hidden) {
                  continue;
              }
              if (element.active && drawActiveElementsOnTop) {
                  active.push(element);
              } else {
                  element.draw(ctx, area);
              }
          }
          for(i = 0; i < active.length; ++i){
              active[i].draw(ctx, area);
          }
      }
   getStyle(index, active) {
          const mode = active ? 'active' : 'default';
          return index === undefined && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
      }
   getContext(index, active, mode) {
          const dataset = this.getDataset();
          let context;
          if (index >= 0 && index < this._cachedMeta.data.length) {
              const element = this._cachedMeta.data[index];
              context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
              context.parsed = this.getParsed(index);
              context.raw = dataset.data[index];
              context.index = context.dataIndex = index;
          } else {
              context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
              context.dataset = dataset;
              context.index = context.datasetIndex = this.index;
          }
          context.active = !!active;
          context.mode = mode;
          return context;
      }
   resolveDatasetElementOptions(mode) {
          return this._resolveElementOptions(this.datasetElementType.id, mode);
      }
   resolveDataElementOptions(index, mode) {
          return this._resolveElementOptions(this.dataElementType.id, mode, index);
      }
   _resolveElementOptions(elementType, mode = 'default', index) {
          const active = mode === 'active';
          const cache = this._cachedDataOpts;
          const cacheKey = elementType + '-' + mode;
          const cached = cache[cacheKey];
          const sharing = this.enableOptionSharing && defined(index);
          if (cached) {
              return cloneIfNotShared(cached, sharing);
          }
          const config = this.chart.config;
          const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
          const prefixes = active ? [
              `${elementType}Hover`,
              'hover',
              elementType,
              ''
          ] : [
              elementType,
              ''
          ];
          const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
          const names = Object.keys(defaults.elements[elementType]);
          const context = ()=>this.getContext(index, active, mode);
          const values = config.resolveNamedOptions(scopes, names, context, prefixes);
          if (values.$shared) {
              values.$shared = sharing;
              cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
          }
          return values;
      }
   _resolveAnimations(index, transition, active) {
          const chart = this.chart;
          const cache = this._cachedDataOpts;
          const cacheKey = `animation-${transition}`;
          const cached = cache[cacheKey];
          if (cached) {
              return cached;
          }
          let options;
          if (chart.options.animation !== false) {
              const config = this.chart.config;
              const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
              const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
              options = config.createResolver(scopes, this.getContext(index, active, transition));
          }
          const animations = new Animations(chart, options && options.animations);
          if (options && options._cacheable) {
              cache[cacheKey] = Object.freeze(animations);
          }
          return animations;
      }
   getSharedOptions(options) {
          if (!options.$shared) {
              return;
          }
          return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
      }
   includeOptions(mode, sharedOptions) {
          return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
      }
   _getSharedOptions(start, mode) {
          const firstOpts = this.resolveDataElementOptions(start, mode);
          const previouslySharedOptions = this._sharedOptions;
          const sharedOptions = this.getSharedOptions(firstOpts);
          const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
          this.updateSharedOptions(sharedOptions, mode, firstOpts);
          return {
              sharedOptions,
              includeOptions
          };
      }
   updateElement(element, index, properties, mode) {
          if (isDirectUpdateMode(mode)) {
              Object.assign(element, properties);
          } else {
              this._resolveAnimations(index, mode).update(element, properties);
          }
      }
   updateSharedOptions(sharedOptions, mode, newOptions) {
          if (sharedOptions && !isDirectUpdateMode(mode)) {
              this._resolveAnimations(undefined, mode).update(sharedOptions, newOptions);
          }
      }
   _setStyle(element, index, mode, active) {
          element.active = active;
          const options = this.getStyle(index, active);
          this._resolveAnimations(index, mode, active).update(element, {
              options: !active && this.getSharedOptions(options) || options
          });
      }
      removeHoverStyle(element, datasetIndex, index) {
          this._setStyle(element, index, 'active', false);
      }
      setHoverStyle(element, datasetIndex, index) {
          this._setStyle(element, index, 'active', true);
      }
   _removeDatasetHoverStyle() {
          const element = this._cachedMeta.dataset;
          if (element) {
              this._setStyle(element, undefined, 'active', false);
          }
      }
   _setDatasetHoverStyle() {
          const element = this._cachedMeta.dataset;
          if (element) {
              this._setStyle(element, undefined, 'active', true);
          }
      }
   _resyncElements(resetNewElements) {
          const data = this._data;
          const elements = this._cachedMeta.data;
          for (const [method, arg1, arg2] of this._syncList){
              this[method](arg1, arg2);
          }
          this._syncList = [];
          const numMeta = elements.length;
          const numData = data.length;
          const count = Math.min(numData, numMeta);
          if (count) {
              this.parse(0, count);
          }
          if (numData > numMeta) {
              this._insertElements(numMeta, numData - numMeta, resetNewElements);
          } else if (numData < numMeta) {
              this._removeElements(numData, numMeta - numData);
          }
      }
   _insertElements(start, count, resetNewElements = true) {
          const meta = this._cachedMeta;
          const data = meta.data;
          const end = start + count;
          let i;
          const move = (arr)=>{
              arr.length += count;
              for(i = arr.length - 1; i >= end; i--){
                  arr[i] = arr[i - count];
              }
          };
          move(data);
          for(i = start; i < end; ++i){
              data[i] = new this.dataElementType();
          }
          if (this._parsing) {
              move(meta._parsed);
          }
          this.parse(start, count);
          if (resetNewElements) {
              this.updateElements(data, start, count, 'reset');
          }
      }
      updateElements(element, start, count, mode) {}
   _removeElements(start, count) {
          const meta = this._cachedMeta;
          if (this._parsing) {
              const removed = meta._parsed.splice(start, count);
              if (meta._stacked) {
                  clearStacks(meta, removed);
              }
          }
          meta.data.splice(start, count);
      }
   _sync(args) {
          if (this._parsing) {
              this._syncList.push(args);
          } else {
              const [method, arg1, arg2] = args;
              this[method](arg1, arg2);
          }
          this.chart._dataChanges.push([
              this.index,
              ...args
          ]);
      }
      _onDataPush() {
          const count = arguments.length;
          this._sync([
              '_insertElements',
              this.getDataset().data.length - count,
              count
          ]);
      }
      _onDataPop() {
          this._sync([
              '_removeElements',
              this._cachedMeta.data.length - 1,
              1
          ]);
      }
      _onDataShift() {
          this._sync([
              '_removeElements',
              0,
              1
          ]);
      }
      _onDataSplice(start, count) {
          if (count) {
              this._sync([
                  '_removeElements',
                  start,
                  count
              ]);
          }
          const newCount = arguments.length - 2;
          if (newCount) {
              this._sync([
                  '_insertElements',
                  start,
                  newCount
              ]);
          }
      }
      _onDataUnshift() {
          this._sync([
              '_insertElements',
              0,
              arguments.length
          ]);
      }
  }

  function getAllScaleValues(scale, type) {
      if (!scale._cache.$bar) {
          const visibleMetas = scale.getMatchingVisibleMetas(type);
          let values = [];
          for(let i = 0, ilen = visibleMetas.length; i < ilen; i++){
              values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
          }
          scale._cache.$bar = _arrayUnique(values.sort((a, b)=>a - b));
      }
      return scale._cache.$bar;
  }
   function computeMinSampleSize(meta) {
      const scale = meta.iScale;
      const values = getAllScaleValues(scale, meta.type);
      let min = scale._length;
      let i, ilen, curr, prev;
      const updateMinAndPrev = ()=>{
          if (curr === 32767 || curr === -32768) {
              return;
          }
          if (defined(prev)) {
              min = Math.min(min, Math.abs(curr - prev) || min);
          }
          prev = curr;
      };
      for(i = 0, ilen = values.length; i < ilen; ++i){
          curr = scale.getPixelForValue(values[i]);
          updateMinAndPrev();
      }
      prev = undefined;
      for(i = 0, ilen = scale.ticks.length; i < ilen; ++i){
          curr = scale.getPixelForTick(i);
          updateMinAndPrev();
      }
      return min;
  }
   function computeFitCategoryTraits(index, ruler, options, stackCount) {
      const thickness = options.barThickness;
      let size, ratio;
      if (isNullOrUndef(thickness)) {
          size = ruler.min * options.categoryPercentage;
          ratio = options.barPercentage;
      } else {
          size = thickness * stackCount;
          ratio = 1;
      }
      return {
          chunk: size / stackCount,
          ratio,
          start: ruler.pixels[index] - size / 2
      };
  }
   function computeFlexCategoryTraits(index, ruler, options, stackCount) {
      const pixels = ruler.pixels;
      const curr = pixels[index];
      let prev = index > 0 ? pixels[index - 1] : null;
      let next = index < pixels.length - 1 ? pixels[index + 1] : null;
      const percent = options.categoryPercentage;
      if (prev === null) {
          prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
      }
      if (next === null) {
          next = curr + curr - prev;
      }
      const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
      const size = Math.abs(next - prev) / 2 * percent;
      return {
          chunk: size / stackCount,
          ratio: options.barPercentage,
          start
      };
  }
  function parseFloatBar(entry, item, vScale, i) {
      const startValue = vScale.parse(entry[0], i);
      const endValue = vScale.parse(entry[1], i);
      const min = Math.min(startValue, endValue);
      const max = Math.max(startValue, endValue);
      let barStart = min;
      let barEnd = max;
      if (Math.abs(min) > Math.abs(max)) {
          barStart = max;
          barEnd = min;
      }
      item[vScale.axis] = barEnd;
      item._custom = {
          barStart,
          barEnd,
          start: startValue,
          end: endValue,
          min,
          max
      };
  }
  function parseValue(entry, item, vScale, i) {
      if (isArray(entry)) {
          parseFloatBar(entry, item, vScale, i);
      } else {
          item[vScale.axis] = vScale.parse(entry, i);
      }
      return item;
  }
  function parseArrayOrPrimitive(meta, data, start, count) {
      const iScale = meta.iScale;
      const vScale = meta.vScale;
      const labels = iScale.getLabels();
      const singleScale = iScale === vScale;
      const parsed = [];
      let i, ilen, item, entry;
      for(i = start, ilen = start + count; i < ilen; ++i){
          entry = data[i];
          item = {};
          item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
          parsed.push(parseValue(entry, item, vScale, i));
      }
      return parsed;
  }
  function isFloatBar(custom) {
      return custom && custom.barStart !== undefined && custom.barEnd !== undefined;
  }
  function barSign(size, vScale, actualBase) {
      if (size !== 0) {
          return sign(size);
      }
      return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
  }
  function borderProps(properties) {
      let reverse, start, end, top, bottom;
      if (properties.horizontal) {
          reverse = properties.base > properties.x;
          start = 'left';
          end = 'right';
      } else {
          reverse = properties.base < properties.y;
          start = 'bottom';
          end = 'top';
      }
      if (reverse) {
          top = 'end';
          bottom = 'start';
      } else {
          top = 'start';
          bottom = 'end';
      }
      return {
          start,
          end,
          reverse,
          top,
          bottom
      };
  }
  function setBorderSkipped(properties, options, stack, index) {
      let edge = options.borderSkipped;
      const res = {};
      if (!edge) {
          properties.borderSkipped = res;
          return;
      }
      if (edge === true) {
          properties.borderSkipped = {
              top: true,
              right: true,
              bottom: true,
              left: true
          };
          return;
      }
      const { start , end , reverse , top , bottom  } = borderProps(properties);
      if (edge === 'middle' && stack) {
          properties.enableBorderRadius = true;
          if ((stack._top || 0) === index) {
              edge = top;
          } else if ((stack._bottom || 0) === index) {
              edge = bottom;
          } else {
              res[parseEdge(bottom, start, end, reverse)] = true;
              edge = top;
          }
      }
      res[parseEdge(edge, start, end, reverse)] = true;
      properties.borderSkipped = res;
  }
  function parseEdge(edge, a, b, reverse) {
      if (reverse) {
          edge = swap(edge, a, b);
          edge = startEnd(edge, b, a);
      } else {
          edge = startEnd(edge, a, b);
      }
      return edge;
  }
  function swap(orig, v1, v2) {
      return orig === v1 ? v2 : orig === v2 ? v1 : orig;
  }
  function startEnd(v, start, end) {
      return v === 'start' ? start : v === 'end' ? end : v;
  }
  function setInflateAmount(properties, { inflateAmount  }, ratio) {
      properties.inflateAmount = inflateAmount === 'auto' ? ratio === 1 ? 0.33 : 0 : inflateAmount;
  }
  class BarController extends DatasetController {
      static id = 'bar';
   static defaults = {
          datasetElementType: false,
          dataElementType: 'bar',
          categoryPercentage: 0.8,
          barPercentage: 0.9,
          grouped: true,
          animations: {
              numbers: {
                  type: 'number',
                  properties: [
                      'x',
                      'y',
                      'base',
                      'width',
                      'height'
                  ]
              }
          }
      };
   static overrides = {
          scales: {
              _index_: {
                  type: 'category',
                  offset: true,
                  grid: {
                      offset: true
                  }
              },
              _value_: {
                  type: 'linear',
                  beginAtZero: true
              }
          }
      };
   parsePrimitiveData(meta, data, start, count) {
          return parseArrayOrPrimitive(meta, data, start, count);
      }
   parseArrayData(meta, data, start, count) {
          return parseArrayOrPrimitive(meta, data, start, count);
      }
   parseObjectData(meta, data, start, count) {
          const { iScale , vScale  } = meta;
          const { xAxisKey ='x' , yAxisKey ='y'  } = this._parsing;
          const iAxisKey = iScale.axis === 'x' ? xAxisKey : yAxisKey;
          const vAxisKey = vScale.axis === 'x' ? xAxisKey : yAxisKey;
          const parsed = [];
          let i, ilen, item, obj;
          for(i = start, ilen = start + count; i < ilen; ++i){
              obj = data[i];
              item = {};
              item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
              parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
          }
          return parsed;
      }
   updateRangeFromParsed(range, scale, parsed, stack) {
          super.updateRangeFromParsed(range, scale, parsed, stack);
          const custom = parsed._custom;
          if (custom && scale === this._cachedMeta.vScale) {
              range.min = Math.min(range.min, custom.min);
              range.max = Math.max(range.max, custom.max);
          }
      }
   getMaxOverflow() {
          return 0;
      }
   getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const { iScale , vScale  } = meta;
          const parsed = this.getParsed(index);
          const custom = parsed._custom;
          const value = isFloatBar(custom) ? '[' + custom.start + ', ' + custom.end + ']' : '' + vScale.getLabelForValue(parsed[vScale.axis]);
          return {
              label: '' + iScale.getLabelForValue(parsed[iScale.axis]),
              value
          };
      }
      initialize() {
          this.enableOptionSharing = true;
          super.initialize();
          const meta = this._cachedMeta;
          meta.stack = this.getDataset().stack;
      }
      update(mode) {
          const meta = this._cachedMeta;
          this.updateElements(meta.data, 0, meta.data.length, mode);
      }
      updateElements(bars, start, count, mode) {
          const reset = mode === 'reset';
          const { index , _cachedMeta: { vScale  }  } = this;
          const base = vScale.getBasePixel();
          const horizontal = vScale.isHorizontal();
          const ruler = this._getRuler();
          const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
          for(let i = start; i < start + count; i++){
              const parsed = this.getParsed(i);
              const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
                  base,
                  head: base
              } : this._calculateBarValuePixels(i);
              const ipixels = this._calculateBarIndexPixels(i, ruler);
              const stack = (parsed._stacks || {})[vScale.axis];
              const properties = {
                  horizontal,
                  base: vpixels.base,
                  enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
                  x: horizontal ? vpixels.head : ipixels.center,
                  y: horizontal ? ipixels.center : vpixels.head,
                  height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                  width: horizontal ? Math.abs(vpixels.size) : ipixels.size
              };
              if (includeOptions) {
                  properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? 'active' : mode);
              }
              const options = properties.options || bars[i].options;
              setBorderSkipped(properties, options, stack, index);
              setInflateAmount(properties, options, ruler.ratio);
              this.updateElement(bars[i], i, properties, mode);
          }
      }
   _getStacks(last, dataIndex) {
          const { iScale  } = this._cachedMeta;
          const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta)=>meta.controller.options.grouped);
          const stacked = iScale.options.stacked;
          const stacks = [];
          const currentParsed = this._cachedMeta.controller.getParsed(dataIndex);
          const iScaleValue = currentParsed && currentParsed[iScale.axis];
          const skipNull = (meta)=>{
              const parsed = meta._parsed.find((item)=>item[iScale.axis] === iScaleValue);
              const val = parsed && parsed[meta.vScale.axis];
              if (isNullOrUndef(val) || isNaN(val)) {
                  return true;
              }
          };
          for (const meta of metasets){
              if (dataIndex !== undefined && skipNull(meta)) {
                  continue;
              }
              if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === undefined && meta.stack === undefined) {
                  stacks.push(meta.stack);
              }
              if (meta.index === last) {
                  break;
              }
          }
          if (!stacks.length) {
              stacks.push(undefined);
          }
          return stacks;
      }
   _getStackCount(index) {
          return this._getStacks(undefined, index).length;
      }
   _getStackIndex(datasetIndex, name, dataIndex) {
          const stacks = this._getStacks(datasetIndex, dataIndex);
          const index = name !== undefined ? stacks.indexOf(name) : -1;
          return index === -1 ? stacks.length - 1 : index;
      }
   _getRuler() {
          const opts = this.options;
          const meta = this._cachedMeta;
          const iScale = meta.iScale;
          const pixels = [];
          let i, ilen;
          for(i = 0, ilen = meta.data.length; i < ilen; ++i){
              pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
          }
          const barThickness = opts.barThickness;
          const min = barThickness || computeMinSampleSize(meta);
          return {
              min,
              pixels,
              start: iScale._startPixel,
              end: iScale._endPixel,
              stackCount: this._getStackCount(),
              scale: iScale,
              grouped: opts.grouped,
              ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
          };
      }
   _calculateBarValuePixels(index) {
          const { _cachedMeta: { vScale , _stacked , index: datasetIndex  } , options: { base: baseValue , minBarLength  }  } = this;
          const actualBase = baseValue || 0;
          const parsed = this.getParsed(index);
          const custom = parsed._custom;
          const floating = isFloatBar(custom);
          let value = parsed[vScale.axis];
          let start = 0;
          let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
          let head, size;
          if (length !== value) {
              start = length - value;
              length = value;
          }
          if (floating) {
              value = custom.barStart;
              length = custom.barEnd - custom.barStart;
              if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
                  start = 0;
              }
              start += value;
          }
          const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
          let base = vScale.getPixelForValue(startValue);
          if (this.chart.getDataVisibility(index)) {
              head = vScale.getPixelForValue(start + length);
          } else {
              head = base;
          }
          size = head - base;
          if (Math.abs(size) < minBarLength) {
              size = barSign(size, vScale, actualBase) * minBarLength;
              if (value === actualBase) {
                  base -= size / 2;
              }
              const startPixel = vScale.getPixelForDecimal(0);
              const endPixel = vScale.getPixelForDecimal(1);
              const min = Math.min(startPixel, endPixel);
              const max = Math.max(startPixel, endPixel);
              base = Math.max(Math.min(base, max), min);
              head = base + size;
              if (_stacked && !floating) {
                  parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
              }
          }
          if (base === vScale.getPixelForValue(actualBase)) {
              const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
              base += halfGrid;
              size -= halfGrid;
          }
          return {
              size,
              base,
              head,
              center: head + size / 2
          };
      }
   _calculateBarIndexPixels(index, ruler) {
          const scale = ruler.scale;
          const options = this.options;
          const skipNull = options.skipNull;
          const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
          let center, size;
          if (ruler.grouped) {
              const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
              const range = options.barThickness === 'flex' ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);
              const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : undefined);
              center = range.start + range.chunk * stackIndex + range.chunk / 2;
              size = Math.min(maxBarThickness, range.chunk * range.ratio);
          } else {
              center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
              size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
          }
          return {
              base: center - size / 2,
              head: center + size / 2,
              center,
              size
          };
      }
      draw() {
          const meta = this._cachedMeta;
          const vScale = meta.vScale;
          const rects = meta.data;
          const ilen = rects.length;
          let i = 0;
          for(; i < ilen; ++i){
              if (this.getParsed(i)[vScale.axis] !== null && !rects[i].hidden) {
                  rects[i].draw(this._ctx);
              }
          }
      }
  }

  class BubbleController extends DatasetController {
      static id = 'bubble';
   static defaults = {
          datasetElementType: false,
          dataElementType: 'point',
          animations: {
              numbers: {
                  type: 'number',
                  properties: [
                      'x',
                      'y',
                      'borderWidth',
                      'radius'
                  ]
              }
          }
      };
   static overrides = {
          scales: {
              x: {
                  type: 'linear'
              },
              y: {
                  type: 'linear'
              }
          }
      };
      initialize() {
          this.enableOptionSharing = true;
          super.initialize();
      }
   parsePrimitiveData(meta, data, start, count) {
          const parsed = super.parsePrimitiveData(meta, data, start, count);
          for(let i = 0; i < parsed.length; i++){
              parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
          }
          return parsed;
      }
   parseArrayData(meta, data, start, count) {
          const parsed = super.parseArrayData(meta, data, start, count);
          for(let i = 0; i < parsed.length; i++){
              const item = data[start + i];
              parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
          }
          return parsed;
      }
   parseObjectData(meta, data, start, count) {
          const parsed = super.parseObjectData(meta, data, start, count);
          for(let i = 0; i < parsed.length; i++){
              const item = data[start + i];
              parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
          }
          return parsed;
      }
   getMaxOverflow() {
          const data = this._cachedMeta.data;
          let max = 0;
          for(let i = data.length - 1; i >= 0; --i){
              max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
          }
          return max > 0 && max;
      }
   getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const labels = this.chart.data.labels || [];
          const { xScale , yScale  } = meta;
          const parsed = this.getParsed(index);
          const x = xScale.getLabelForValue(parsed.x);
          const y = yScale.getLabelForValue(parsed.y);
          const r = parsed._custom;
          return {
              label: labels[index] || '',
              value: '(' + x + ', ' + y + (r ? ', ' + r : '') + ')'
          };
      }
      update(mode) {
          const points = this._cachedMeta.data;
          this.updateElements(points, 0, points.length, mode);
      }
      updateElements(points, start, count, mode) {
          const reset = mode === 'reset';
          const { iScale , vScale  } = this._cachedMeta;
          const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          for(let i = start; i < start + count; i++){
              const point = points[i];
              const parsed = !reset && this.getParsed(i);
              const properties = {};
              const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
              const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
              properties.skip = isNaN(iPixel) || isNaN(vPixel);
              if (includeOptions) {
                  properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
                  if (reset) {
                      properties.options.radius = 0;
                  }
              }
              this.updateElement(point, i, properties, mode);
          }
      }
   resolveDataElementOptions(index, mode) {
          const parsed = this.getParsed(index);
          let values = super.resolveDataElementOptions(index, mode);
          if (values.$shared) {
              values = Object.assign({}, values, {
                  $shared: false
              });
          }
          const radius = values.radius;
          if (mode !== 'active') {
              values.radius = 0;
          }
          values.radius += valueOrDefault(parsed && parsed._custom, radius);
          return values;
      }
  }

  function getRatioAndOffset(rotation, circumference, cutout) {
      let ratioX = 1;
      let ratioY = 1;
      let offsetX = 0;
      let offsetY = 0;
      if (circumference < TAU) {
          const startAngle = rotation;
          const endAngle = startAngle + circumference;
          const startX = Math.cos(startAngle);
          const startY = Math.sin(startAngle);
          const endX = Math.cos(endAngle);
          const endY = Math.sin(endAngle);
          const calcMax = (angle, a, b)=>_angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
          const calcMin = (angle, a, b)=>_angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
          const maxX = calcMax(0, startX, endX);
          const maxY = calcMax(HALF_PI, startY, endY);
          const minX = calcMin(PI, startX, endX);
          const minY = calcMin(PI + HALF_PI, startY, endY);
          ratioX = (maxX - minX) / 2;
          ratioY = (maxY - minY) / 2;
          offsetX = -(maxX + minX) / 2;
          offsetY = -(maxY + minY) / 2;
      }
      return {
          ratioX,
          ratioY,
          offsetX,
          offsetY
      };
  }
  class DoughnutController extends DatasetController {
      static id = 'doughnut';
   static defaults = {
          datasetElementType: false,
          dataElementType: 'arc',
          animation: {
              animateRotate: true,
              animateScale: false
          },
          animations: {
              numbers: {
                  type: 'number',
                  properties: [
                      'circumference',
                      'endAngle',
                      'innerRadius',
                      'outerRadius',
                      'startAngle',
                      'x',
                      'y',
                      'offset',
                      'borderWidth',
                      'spacing'
                  ]
              }
          },
          cutout: '50%',
          rotation: 0,
          circumference: 360,
          radius: '100%',
          spacing: 0,
          indexAxis: 'r'
      };
      static descriptors = {
          _scriptable: (name)=>name !== 'spacing',
          _indexable: (name)=>name !== 'spacing' && !name.startsWith('borderDash') && !name.startsWith('hoverBorderDash')
      };
   static overrides = {
          aspectRatio: 1,
          plugins: {
              legend: {
                  labels: {
                      generateLabels (chart) {
                          const data = chart.data;
                          if (data.labels.length && data.datasets.length) {
                              const { labels: { pointStyle , color  }  } = chart.legend.options;
                              return data.labels.map((label, i)=>{
                                  const meta = chart.getDatasetMeta(0);
                                  const style = meta.controller.getStyle(i);
                                  return {
                                      text: label,
                                      fillStyle: style.backgroundColor,
                                      strokeStyle: style.borderColor,
                                      fontColor: color,
                                      lineWidth: style.borderWidth,
                                      pointStyle: pointStyle,
                                      hidden: !chart.getDataVisibility(i),
                                      index: i
                                  };
                              });
                          }
                          return [];
                      }
                  },
                  onClick (e, legendItem, legend) {
                      legend.chart.toggleDataVisibility(legendItem.index);
                      legend.chart.update();
                  }
              }
          }
      };
      constructor(chart, datasetIndex){
          super(chart, datasetIndex);
          this.enableOptionSharing = true;
          this.innerRadius = undefined;
          this.outerRadius = undefined;
          this.offsetX = undefined;
          this.offsetY = undefined;
      }
      linkScales() {}
   parse(start, count) {
          const data = this.getDataset().data;
          const meta = this._cachedMeta;
          if (this._parsing === false) {
              meta._parsed = data;
          } else {
              let getter = (i)=>+data[i];
              if (isObject(data[start])) {
                  const { key ='value'  } = this._parsing;
                  getter = (i)=>+resolveObjectKey(data[i], key);
              }
              let i, ilen;
              for(i = start, ilen = start + count; i < ilen; ++i){
                  meta._parsed[i] = getter(i);
              }
          }
      }
   _getRotation() {
          return toRadians(this.options.rotation - 90);
      }
   _getCircumference() {
          return toRadians(this.options.circumference);
      }
   _getRotationExtents() {
          let min = TAU;
          let max = -TAU;
          for(let i = 0; i < this.chart.data.datasets.length; ++i){
              if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
                  const controller = this.chart.getDatasetMeta(i).controller;
                  const rotation = controller._getRotation();
                  const circumference = controller._getCircumference();
                  min = Math.min(min, rotation);
                  max = Math.max(max, rotation + circumference);
              }
          }
          return {
              rotation: min,
              circumference: max - min
          };
      }
   update(mode) {
          const chart = this.chart;
          const { chartArea  } = chart;
          const meta = this._cachedMeta;
          const arcs = meta.data;
          const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
          const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
          const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
          const chartWeight = this._getRingWeight(this.index);
          const { circumference , rotation  } = this._getRotationExtents();
          const { ratioX , ratioY , offsetX , offsetY  } = getRatioAndOffset(rotation, circumference, cutout);
          const maxWidth = (chartArea.width - spacing) / ratioX;
          const maxHeight = (chartArea.height - spacing) / ratioY;
          const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
          const outerRadius = toDimension(this.options.radius, maxRadius);
          const innerRadius = Math.max(outerRadius * cutout, 0);
          const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
          this.offsetX = offsetX * outerRadius;
          this.offsetY = offsetY * outerRadius;
          meta.total = this.calculateTotal();
          this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
          this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
          this.updateElements(arcs, 0, arcs.length, mode);
      }
   _circumference(i, reset) {
          const opts = this.options;
          const meta = this._cachedMeta;
          const circumference = this._getCircumference();
          if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) {
              return 0;
          }
          return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
      }
      updateElements(arcs, start, count, mode) {
          const reset = mode === 'reset';
          const chart = this.chart;
          const chartArea = chart.chartArea;
          const opts = chart.options;
          const animationOpts = opts.animation;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          const animateScale = reset && animationOpts.animateScale;
          const innerRadius = animateScale ? 0 : this.innerRadius;
          const outerRadius = animateScale ? 0 : this.outerRadius;
          const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
          let startAngle = this._getRotation();
          let i;
          for(i = 0; i < start; ++i){
              startAngle += this._circumference(i, reset);
          }
          for(i = start; i < start + count; ++i){
              const circumference = this._circumference(i, reset);
              const arc = arcs[i];
              const properties = {
                  x: centerX + this.offsetX,
                  y: centerY + this.offsetY,
                  startAngle,
                  endAngle: startAngle + circumference,
                  circumference,
                  outerRadius,
                  innerRadius
              };
              if (includeOptions) {
                  properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? 'active' : mode);
              }
              startAngle += circumference;
              this.updateElement(arc, i, properties, mode);
          }
      }
      calculateTotal() {
          const meta = this._cachedMeta;
          const metaData = meta.data;
          let total = 0;
          let i;
          for(i = 0; i < metaData.length; i++){
              const value = meta._parsed[i];
              if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) {
                  total += Math.abs(value);
              }
          }
          return total;
      }
      calculateCircumference(value) {
          const total = this._cachedMeta.total;
          if (total > 0 && !isNaN(value)) {
              return TAU * (Math.abs(value) / total);
          }
          return 0;
      }
      getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const chart = this.chart;
          const labels = chart.data.labels || [];
          const value = formatNumber(meta._parsed[index], chart.options.locale);
          return {
              label: labels[index] || '',
              value
          };
      }
      getMaxBorderWidth(arcs) {
          let max = 0;
          const chart = this.chart;
          let i, ilen, meta, controller, options;
          if (!arcs) {
              for(i = 0, ilen = chart.data.datasets.length; i < ilen; ++i){
                  if (chart.isDatasetVisible(i)) {
                      meta = chart.getDatasetMeta(i);
                      arcs = meta.data;
                      controller = meta.controller;
                      break;
                  }
              }
          }
          if (!arcs) {
              return 0;
          }
          for(i = 0, ilen = arcs.length; i < ilen; ++i){
              options = controller.resolveDataElementOptions(i);
              if (options.borderAlign !== 'inner') {
                  max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
              }
          }
          return max;
      }
      getMaxOffset(arcs) {
          let max = 0;
          for(let i = 0, ilen = arcs.length; i < ilen; ++i){
              const options = this.resolveDataElementOptions(i);
              max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
          }
          return max;
      }
   _getRingWeightOffset(datasetIndex) {
          let ringWeightOffset = 0;
          for(let i = 0; i < datasetIndex; ++i){
              if (this.chart.isDatasetVisible(i)) {
                  ringWeightOffset += this._getRingWeight(i);
              }
          }
          return ringWeightOffset;
      }
   _getRingWeight(datasetIndex) {
          return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
      }
   _getVisibleDatasetWeightTotal() {
          return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
      }
  }

  class LineController extends DatasetController {
      static id = 'line';
   static defaults = {
          datasetElementType: 'line',
          dataElementType: 'point',
          showLine: true,
          spanGaps: false
      };
   static overrides = {
          scales: {
              _index_: {
                  type: 'category'
              },
              _value_: {
                  type: 'linear'
              }
          }
      };
      initialize() {
          this.enableOptionSharing = true;
          this.supportsDecimation = true;
          super.initialize();
      }
      update(mode) {
          const meta = this._cachedMeta;
          const { dataset: line , data: points = [] , _dataset  } = meta;
          const animationsDisabled = this.chart._animationsDisabled;
          let { start , count  } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
          this._drawStart = start;
          this._drawCount = count;
          if (_scaleRangesChanged(meta)) {
              start = 0;
              count = points.length;
          }
          line._chart = this.chart;
          line._datasetIndex = this.index;
          line._decimated = !!_dataset._decimated;
          line.points = points;
          const options = this.resolveDatasetElementOptions(mode);
          if (!this.options.showLine) {
              options.borderWidth = 0;
          }
          options.segment = this.options.segment;
          this.updateElement(line, undefined, {
              animated: !animationsDisabled,
              options
          }, mode);
          this.updateElements(points, start, count, mode);
      }
      updateElements(points, start, count, mode) {
          const reset = mode === 'reset';
          const { iScale , vScale , _stacked , _dataset  } = this._cachedMeta;
          const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          const { spanGaps , segment  } = this.options;
          const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
          const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
          const end = start + count;
          const pointsCount = points.length;
          let prevParsed = start > 0 && this.getParsed(start - 1);
          for(let i = 0; i < pointsCount; ++i){
              const point = points[i];
              const properties = directUpdate ? point : {};
              if (i < start || i >= end) {
                  properties.skip = true;
                  continue;
              }
              const parsed = this.getParsed(i);
              const nullData = isNullOrUndef(parsed[vAxis]);
              const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
              const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
              properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
              properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
              if (segment) {
                  properties.parsed = parsed;
                  properties.raw = _dataset.data[i];
              }
              if (includeOptions) {
                  properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
              }
              if (!directUpdate) {
                  this.updateElement(point, i, properties, mode);
              }
              prevParsed = parsed;
          }
      }
   getMaxOverflow() {
          const meta = this._cachedMeta;
          const dataset = meta.dataset;
          const border = dataset.options && dataset.options.borderWidth || 0;
          const data = meta.data || [];
          if (!data.length) {
              return border;
          }
          const firstPoint = data[0].size(this.resolveDataElementOptions(0));
          const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
          return Math.max(border, firstPoint, lastPoint) / 2;
      }
      draw() {
          const meta = this._cachedMeta;
          meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
          super.draw();
      }
  }

  class PolarAreaController extends DatasetController {
      static id = 'polarArea';
   static defaults = {
          dataElementType: 'arc',
          animation: {
              animateRotate: true,
              animateScale: true
          },
          animations: {
              numbers: {
                  type: 'number',
                  properties: [
                      'x',
                      'y',
                      'startAngle',
                      'endAngle',
                      'innerRadius',
                      'outerRadius'
                  ]
              }
          },
          indexAxis: 'r',
          startAngle: 0
      };
   static overrides = {
          aspectRatio: 1,
          plugins: {
              legend: {
                  labels: {
                      generateLabels (chart) {
                          const data = chart.data;
                          if (data.labels.length && data.datasets.length) {
                              const { labels: { pointStyle , color  }  } = chart.legend.options;
                              return data.labels.map((label, i)=>{
                                  const meta = chart.getDatasetMeta(0);
                                  const style = meta.controller.getStyle(i);
                                  return {
                                      text: label,
                                      fillStyle: style.backgroundColor,
                                      strokeStyle: style.borderColor,
                                      fontColor: color,
                                      lineWidth: style.borderWidth,
                                      pointStyle: pointStyle,
                                      hidden: !chart.getDataVisibility(i),
                                      index: i
                                  };
                              });
                          }
                          return [];
                      }
                  },
                  onClick (e, legendItem, legend) {
                      legend.chart.toggleDataVisibility(legendItem.index);
                      legend.chart.update();
                  }
              }
          },
          scales: {
              r: {
                  type: 'radialLinear',
                  angleLines: {
                      display: false
                  },
                  beginAtZero: true,
                  grid: {
                      circular: true
                  },
                  pointLabels: {
                      display: false
                  },
                  startAngle: 0
              }
          }
      };
      constructor(chart, datasetIndex){
          super(chart, datasetIndex);
          this.innerRadius = undefined;
          this.outerRadius = undefined;
      }
      getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const chart = this.chart;
          const labels = chart.data.labels || [];
          const value = formatNumber(meta._parsed[index].r, chart.options.locale);
          return {
              label: labels[index] || '',
              value
          };
      }
      parseObjectData(meta, data, start, count) {
          return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
      }
      update(mode) {
          const arcs = this._cachedMeta.data;
          this._updateRadius();
          this.updateElements(arcs, 0, arcs.length, mode);
      }
   getMinMax() {
          const meta = this._cachedMeta;
          const range = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY
          };
          meta.data.forEach((element, index)=>{
              const parsed = this.getParsed(index).r;
              if (!isNaN(parsed) && this.chart.getDataVisibility(index)) {
                  if (parsed < range.min) {
                      range.min = parsed;
                  }
                  if (parsed > range.max) {
                      range.max = parsed;
                  }
              }
          });
          return range;
      }
   _updateRadius() {
          const chart = this.chart;
          const chartArea = chart.chartArea;
          const opts = chart.options;
          const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          const outerRadius = Math.max(minSize / 2, 0);
          const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
          const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
          this.outerRadius = outerRadius - radiusLength * this.index;
          this.innerRadius = this.outerRadius - radiusLength;
      }
      updateElements(arcs, start, count, mode) {
          const reset = mode === 'reset';
          const chart = this.chart;
          const opts = chart.options;
          const animationOpts = opts.animation;
          const scale = this._cachedMeta.rScale;
          const centerX = scale.xCenter;
          const centerY = scale.yCenter;
          const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * PI;
          let angle = datasetStartAngle;
          let i;
          const defaultAngle = 360 / this.countVisibleElements();
          for(i = 0; i < start; ++i){
              angle += this._computeAngle(i, mode, defaultAngle);
          }
          for(i = start; i < start + count; i++){
              const arc = arcs[i];
              let startAngle = angle;
              let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
              let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
              angle = endAngle;
              if (reset) {
                  if (animationOpts.animateScale) {
                      outerRadius = 0;
                  }
                  if (animationOpts.animateRotate) {
                      startAngle = endAngle = datasetStartAngle;
                  }
              }
              const properties = {
                  x: centerX,
                  y: centerY,
                  innerRadius: 0,
                  outerRadius,
                  startAngle,
                  endAngle,
                  options: this.resolveDataElementOptions(i, arc.active ? 'active' : mode)
              };
              this.updateElement(arc, i, properties, mode);
          }
      }
      countVisibleElements() {
          const meta = this._cachedMeta;
          let count = 0;
          meta.data.forEach((element, index)=>{
              if (!isNaN(this.getParsed(index).r) && this.chart.getDataVisibility(index)) {
                  count++;
              }
          });
          return count;
      }
   _computeAngle(index, mode, defaultAngle) {
          return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
      }
  }

  class PieController extends DoughnutController {
      static id = 'pie';
   static defaults = {
          cutout: 0,
          rotation: 0,
          circumference: 360,
          radius: '100%'
      };
  }

  class RadarController extends DatasetController {
      static id = 'radar';
   static defaults = {
          datasetElementType: 'line',
          dataElementType: 'point',
          indexAxis: 'r',
          showLine: true,
          elements: {
              line: {
                  fill: 'start'
              }
          }
      };
   static overrides = {
          aspectRatio: 1,
          scales: {
              r: {
                  type: 'radialLinear'
              }
          }
      };
   getLabelAndValue(index) {
          const vScale = this._cachedMeta.vScale;
          const parsed = this.getParsed(index);
          return {
              label: vScale.getLabels()[index],
              value: '' + vScale.getLabelForValue(parsed[vScale.axis])
          };
      }
      parseObjectData(meta, data, start, count) {
          return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
      }
      update(mode) {
          const meta = this._cachedMeta;
          const line = meta.dataset;
          const points = meta.data || [];
          const labels = meta.iScale.getLabels();
          line.points = points;
          if (mode !== 'resize') {
              const options = this.resolveDatasetElementOptions(mode);
              if (!this.options.showLine) {
                  options.borderWidth = 0;
              }
              const properties = {
                  _loop: true,
                  _fullLoop: labels.length === points.length,
                  options
              };
              this.updateElement(line, undefined, properties, mode);
          }
          this.updateElements(points, 0, points.length, mode);
      }
      updateElements(points, start, count, mode) {
          const scale = this._cachedMeta.rScale;
          const reset = mode === 'reset';
          for(let i = start; i < start + count; i++){
              const point = points[i];
              const options = this.resolveDataElementOptions(i, point.active ? 'active' : mode);
              const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
              const x = reset ? scale.xCenter : pointPosition.x;
              const y = reset ? scale.yCenter : pointPosition.y;
              const properties = {
                  x,
                  y,
                  angle: pointPosition.angle,
                  skip: isNaN(x) || isNaN(y),
                  options
              };
              this.updateElement(point, i, properties, mode);
          }
      }
  }

  class ScatterController extends DatasetController {
      static id = 'scatter';
   static defaults = {
          datasetElementType: false,
          dataElementType: 'point',
          showLine: false,
          fill: false
      };
   static overrides = {
          interaction: {
              mode: 'point'
          },
          scales: {
              x: {
                  type: 'linear'
              },
              y: {
                  type: 'linear'
              }
          }
      };
   getLabelAndValue(index) {
          const meta = this._cachedMeta;
          const labels = this.chart.data.labels || [];
          const { xScale , yScale  } = meta;
          const parsed = this.getParsed(index);
          const x = xScale.getLabelForValue(parsed.x);
          const y = yScale.getLabelForValue(parsed.y);
          return {
              label: labels[index] || '',
              value: '(' + x + ', ' + y + ')'
          };
      }
      update(mode) {
          const meta = this._cachedMeta;
          const { data: points = []  } = meta;
          const animationsDisabled = this.chart._animationsDisabled;
          let { start , count  } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
          this._drawStart = start;
          this._drawCount = count;
          if (_scaleRangesChanged(meta)) {
              start = 0;
              count = points.length;
          }
          if (this.options.showLine) {
              if (!this.datasetElementType) {
                  this.addElements();
              }
              const { dataset: line , _dataset  } = meta;
              line._chart = this.chart;
              line._datasetIndex = this.index;
              line._decimated = !!_dataset._decimated;
              line.points = points;
              const options = this.resolveDatasetElementOptions(mode);
              options.segment = this.options.segment;
              this.updateElement(line, undefined, {
                  animated: !animationsDisabled,
                  options
              }, mode);
          } else if (this.datasetElementType) {
              delete meta.dataset;
              this.datasetElementType = false;
          }
          this.updateElements(points, start, count, mode);
      }
      addElements() {
          const { showLine  } = this.options;
          if (!this.datasetElementType && showLine) {
              this.datasetElementType = this.chart.registry.getElement('line');
          }
          super.addElements();
      }
      updateElements(points, start, count, mode) {
          const reset = mode === 'reset';
          const { iScale , vScale , _stacked , _dataset  } = this._cachedMeta;
          const firstOpts = this.resolveDataElementOptions(start, mode);
          const sharedOptions = this.getSharedOptions(firstOpts);
          const includeOptions = this.includeOptions(mode, sharedOptions);
          const iAxis = iScale.axis;
          const vAxis = vScale.axis;
          const { spanGaps , segment  } = this.options;
          const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
          const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
          let prevParsed = start > 0 && this.getParsed(start - 1);
          for(let i = start; i < start + count; ++i){
              const point = points[i];
              const parsed = this.getParsed(i);
              const properties = directUpdate ? point : {};
              const nullData = isNullOrUndef(parsed[vAxis]);
              const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
              const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
              properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
              properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
              if (segment) {
                  properties.parsed = parsed;
                  properties.raw = _dataset.data[i];
              }
              if (includeOptions) {
                  properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
              }
              if (!directUpdate) {
                  this.updateElement(point, i, properties, mode);
              }
              prevParsed = parsed;
          }
          this.updateSharedOptions(sharedOptions, mode, firstOpts);
      }
   getMaxOverflow() {
          const meta = this._cachedMeta;
          const data = meta.data || [];
          if (!this.options.showLine) {
              let max = 0;
              for(let i = data.length - 1; i >= 0; --i){
                  max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
              }
              return max > 0 && max;
          }
          const dataset = meta.dataset;
          const border = dataset.options && dataset.options.borderWidth || 0;
          if (!data.length) {
              return border;
          }
          const firstPoint = data[0].size(this.resolveDataElementOptions(0));
          const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
          return Math.max(border, firstPoint, lastPoint) / 2;
      }
  }

  var controllers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BarController: BarController,
  BubbleController: BubbleController,
  DoughnutController: DoughnutController,
  LineController: LineController,
  PieController: PieController,
  PolarAreaController: PolarAreaController,
  RadarController: RadarController,
  ScatterController: ScatterController
  });

  /**
   * @namespace Chart._adapters
   * @since 2.8.0
   * @private
   */ function abstract() {
      throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
  }
  /**
   * Date adapter (current used by the time scale)
   * @namespace Chart._adapters._date
   * @memberof Chart._adapters
   * @private
   */ class DateAdapterBase {
      /**
     * Override default date adapter methods.
     * Accepts type parameter to define options type.
     * @example
     * Chart._adapters._date.override<{myAdapterOption: string}>({
     *   init() {
     *     console.log(this.options.myAdapterOption);
     *   }
     * })
     */ static override(members) {
          Object.assign(DateAdapterBase.prototype, members);
      }
      options;
      constructor(options){
          this.options = options || {};
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      init() {}
      formats() {
          return abstract();
      }
      parse() {
          return abstract();
      }
      format() {
          return abstract();
      }
      add() {
          return abstract();
      }
      diff() {
          return abstract();
      }
      startOf() {
          return abstract();
      }
      endOf() {
          return abstract();
      }
  }
  var adapters = {
      _date: DateAdapterBase
  };

  function binarySearch(metaset, axis, value, intersect) {
      const { controller , data , _sorted  } = metaset;
      const iScale = controller._cachedMeta.iScale;
      const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
      if (iScale && axis === iScale.axis && axis !== 'r' && _sorted && data.length) {
          const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
          if (!intersect) {
              const result = lookupMethod(data, axis, value);
              if (spanGaps) {
                  const { vScale  } = controller._cachedMeta;
                  const { _parsed  } = metaset;
                  const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point)=>!isNullOrUndef(point[vScale.axis]));
                  result.lo -= Math.max(0, distanceToDefinedLo);
                  const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point)=>!isNullOrUndef(point[vScale.axis]));
                  result.hi += Math.max(0, distanceToDefinedHi);
              }
              return result;
          } else if (controller._sharedOptions) {
              const el = data[0];
              const range = typeof el.getRange === 'function' && el.getRange(axis);
              if (range) {
                  const start = lookupMethod(data, axis, value - range);
                  const end = lookupMethod(data, axis, value + range);
                  return {
                      lo: start.lo,
                      hi: end.hi
                  };
              }
          }
      }
      return {
          lo: 0,
          hi: data.length - 1
      };
  }
   function evaluateInteractionItems(chart, axis, position, handler, intersect) {
      const metasets = chart.getSortedVisibleDatasetMetas();
      const value = position[axis];
      for(let i = 0, ilen = metasets.length; i < ilen; ++i){
          const { index , data  } = metasets[i];
          const { lo , hi  } = binarySearch(metasets[i], axis, value, intersect);
          for(let j = lo; j <= hi; ++j){
              const element = data[j];
              if (!element.skip) {
                  handler(element, index, j);
              }
          }
      }
  }
   function getDistanceMetricForAxis(axis) {
      const useX = axis.indexOf('x') !== -1;
      const useY = axis.indexOf('y') !== -1;
      return function(pt1, pt2) {
          const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
          const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
          return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      };
  }
   function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
      const items = [];
      if (!includeInvisible && !chart.isPointInArea(position)) {
          return items;
      }
      const evaluationFunc = function(element, datasetIndex, index) {
          if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
              return;
          }
          if (element.inRange(position.x, position.y, useFinalPosition)) {
              items.push({
                  element,
                  datasetIndex,
                  index
              });
          }
      };
      evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
      return items;
  }
   function getNearestRadialItems(chart, position, axis, useFinalPosition) {
      let items = [];
      function evaluationFunc(element, datasetIndex, index) {
          const { startAngle , endAngle  } = element.getProps([
              'startAngle',
              'endAngle'
          ], useFinalPosition);
          const { angle  } = getAngleFromPoint(element, {
              x: position.x,
              y: position.y
          });
          if (_angleBetween(angle, startAngle, endAngle)) {
              items.push({
                  element,
                  datasetIndex,
                  index
              });
          }
      }
      evaluateInteractionItems(chart, axis, position, evaluationFunc);
      return items;
  }
   function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
      let items = [];
      const distanceMetric = getDistanceMetricForAxis(axis);
      let minDistance = Number.POSITIVE_INFINITY;
      function evaluationFunc(element, datasetIndex, index) {
          const inRange = element.inRange(position.x, position.y, useFinalPosition);
          if (intersect && !inRange) {
              return;
          }
          const center = element.getCenterPoint(useFinalPosition);
          const pointInArea = !!includeInvisible || chart.isPointInArea(center);
          if (!pointInArea && !inRange) {
              return;
          }
          const distance = distanceMetric(position, center);
          if (distance < minDistance) {
              items = [
                  {
                      element,
                      datasetIndex,
                      index
                  }
              ];
              minDistance = distance;
          } else if (distance === minDistance) {
              items.push({
                  element,
                  datasetIndex,
                  index
              });
          }
      }
      evaluateInteractionItems(chart, axis, position, evaluationFunc);
      return items;
  }
   function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
      if (!includeInvisible && !chart.isPointInArea(position)) {
          return [];
      }
      return axis === 'r' && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
  }
   function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
      const items = [];
      const rangeMethod = axis === 'x' ? 'inXRange' : 'inYRange';
      let intersectsItem = false;
      evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index)=>{
          if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
              items.push({
                  element,
                  datasetIndex,
                  index
              });
              intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
          }
      });
      if (intersect && !intersectsItem) {
          return [];
      }
      return items;
  }
   var Interaction = {
      modes: {
   index (chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || 'x';
              const includeInvisible = options.includeInvisible || false;
              const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
              const elements = [];
              if (!items.length) {
                  return [];
              }
              chart.getSortedVisibleDatasetMetas().forEach((meta)=>{
                  const index = items[0].index;
                  const element = meta.data[index];
                  if (element && !element.skip) {
                      elements.push({
                          element,
                          datasetIndex: meta.index,
                          index
                      });
                  }
              });
              return elements;
          },
   dataset (chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || 'xy';
              const includeInvisible = options.includeInvisible || false;
              let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
              if (items.length > 0) {
                  const datasetIndex = items[0].datasetIndex;
                  const data = chart.getDatasetMeta(datasetIndex).data;
                  items = [];
                  for(let i = 0; i < data.length; ++i){
                      items.push({
                          element: data[i],
                          datasetIndex,
                          index: i
                      });
                  }
              }
              return items;
          },
   point (chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || 'xy';
              const includeInvisible = options.includeInvisible || false;
              return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
          },
   nearest (chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              const axis = options.axis || 'xy';
              const includeInvisible = options.includeInvisible || false;
              return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
          },
   x (chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              return getAxisItems(chart, position, 'x', options.intersect, useFinalPosition);
          },
   y (chart, e, options, useFinalPosition) {
              const position = getRelativePosition(e, chart);
              return getAxisItems(chart, position, 'y', options.intersect, useFinalPosition);
          }
      }
  };

  const STATIC_POSITIONS = [
      'left',
      'top',
      'right',
      'bottom'
  ];
  function filterByPosition(array, position) {
      return array.filter((v)=>v.pos === position);
  }
  function filterDynamicPositionByAxis(array, axis) {
      return array.filter((v)=>STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
  }
  function sortByWeight(array, reverse) {
      return array.sort((a, b)=>{
          const v0 = reverse ? b : a;
          const v1 = reverse ? a : b;
          return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
      });
  }
  function wrapBoxes(boxes) {
      const layoutBoxes = [];
      let i, ilen, box, pos, stack, stackWeight;
      for(i = 0, ilen = (boxes || []).length; i < ilen; ++i){
          box = boxes[i];
          ({ position: pos , options: { stack , stackWeight =1  }  } = box);
          layoutBoxes.push({
              index: i,
              box,
              pos,
              horizontal: box.isHorizontal(),
              weight: box.weight,
              stack: stack && pos + stack,
              stackWeight
          });
      }
      return layoutBoxes;
  }
  function buildStacks(layouts) {
      const stacks = {};
      for (const wrap of layouts){
          const { stack , pos , stackWeight  } = wrap;
          if (!stack || !STATIC_POSITIONS.includes(pos)) {
              continue;
          }
          const _stack = stacks[stack] || (stacks[stack] = {
              count: 0,
              placed: 0,
              weight: 0,
              size: 0
          });
          _stack.count++;
          _stack.weight += stackWeight;
      }
      return stacks;
  }
   function setLayoutDims(layouts, params) {
      const stacks = buildStacks(layouts);
      const { vBoxMaxWidth , hBoxMaxHeight  } = params;
      let i, ilen, layout;
      for(i = 0, ilen = layouts.length; i < ilen; ++i){
          layout = layouts[i];
          const { fullSize  } = layout.box;
          const stack = stacks[layout.stack];
          const factor = stack && layout.stackWeight / stack.weight;
          if (layout.horizontal) {
              layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
              layout.height = hBoxMaxHeight;
          } else {
              layout.width = vBoxMaxWidth;
              layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
          }
      }
      return stacks;
  }
  function buildLayoutBoxes(boxes) {
      const layoutBoxes = wrapBoxes(boxes);
      const fullSize = sortByWeight(layoutBoxes.filter((wrap)=>wrap.box.fullSize), true);
      const left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
      const right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
      const top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
      const bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
      const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, 'x');
      const centerVertical = filterDynamicPositionByAxis(layoutBoxes, 'y');
      return {
          fullSize,
          leftAndTop: left.concat(top),
          rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
          chartArea: filterByPosition(layoutBoxes, 'chartArea'),
          vertical: left.concat(right).concat(centerVertical),
          horizontal: top.concat(bottom).concat(centerHorizontal)
      };
  }
  function getCombinedMax(maxPadding, chartArea, a, b) {
      return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
  }
  function updateMaxPadding(maxPadding, boxPadding) {
      maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
      maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
      maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
      maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
  }
  function updateDims(chartArea, params, layout, stacks) {
      const { pos , box  } = layout;
      const maxPadding = chartArea.maxPadding;
      if (!isObject(pos)) {
          if (layout.size) {
              chartArea[pos] -= layout.size;
          }
          const stack = stacks[layout.stack] || {
              size: 0,
              count: 1
          };
          stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
          layout.size = stack.size / stack.count;
          chartArea[pos] += layout.size;
      }
      if (box.getPadding) {
          updateMaxPadding(maxPadding, box.getPadding());
      }
      const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right'));
      const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom'));
      const widthChanged = newWidth !== chartArea.w;
      const heightChanged = newHeight !== chartArea.h;
      chartArea.w = newWidth;
      chartArea.h = newHeight;
      return layout.horizontal ? {
          same: widthChanged,
          other: heightChanged
      } : {
          same: heightChanged,
          other: widthChanged
      };
  }
  function handleMaxPadding(chartArea) {
      const maxPadding = chartArea.maxPadding;
      function updatePos(pos) {
          const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
          chartArea[pos] += change;
          return change;
      }
      chartArea.y += updatePos('top');
      chartArea.x += updatePos('left');
      updatePos('right');
      updatePos('bottom');
  }
  function getMargins(horizontal, chartArea) {
      const maxPadding = chartArea.maxPadding;
      function marginForPositions(positions) {
          const margin = {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
          };
          positions.forEach((pos)=>{
              margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
          });
          return margin;
      }
      return horizontal ? marginForPositions([
          'left',
          'right'
      ]) : marginForPositions([
          'top',
          'bottom'
      ]);
  }
  function fitBoxes(boxes, chartArea, params, stacks) {
      const refitBoxes = [];
      let i, ilen, layout, box, refit, changed;
      for(i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i){
          layout = boxes[i];
          box = layout.box;
          box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
          const { same , other  } = updateDims(chartArea, params, layout, stacks);
          refit |= same && refitBoxes.length;
          changed = changed || other;
          if (!box.fullSize) {
              refitBoxes.push(layout);
          }
      }
      return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
  }
  function setBoxDims(box, left, top, width, height) {
      box.top = top;
      box.left = left;
      box.right = left + width;
      box.bottom = top + height;
      box.width = width;
      box.height = height;
  }
  function placeBoxes(boxes, chartArea, params, stacks) {
      const userPadding = params.padding;
      let { x , y  } = chartArea;
      for (const layout of boxes){
          const box = layout.box;
          const stack = stacks[layout.stack] || {
              placed: 0,
              weight: 1
          };
          const weight = layout.stackWeight / stack.weight || 1;
          if (layout.horizontal) {
              const width = chartArea.w * weight;
              const height = stack.size || box.height;
              if (defined(stack.start)) {
                  y = stack.start;
              }
              if (box.fullSize) {
                  setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
              } else {
                  setBoxDims(box, chartArea.left + stack.placed, y, width, height);
              }
              stack.start = y;
              stack.placed += width;
              y = box.bottom;
          } else {
              const height = chartArea.h * weight;
              const width = stack.size || box.width;
              if (defined(stack.start)) {
                  x = stack.start;
              }
              if (box.fullSize) {
                  setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
              } else {
                  setBoxDims(box, x, chartArea.top + stack.placed, width, height);
              }
              stack.start = x;
              stack.placed += height;
              x = box.right;
          }
      }
      chartArea.x = x;
      chartArea.y = y;
  }
  var layouts = {
   addBox (chart, item) {
          if (!chart.boxes) {
              chart.boxes = [];
          }
          item.fullSize = item.fullSize || false;
          item.position = item.position || 'top';
          item.weight = item.weight || 0;
          item._layers = item._layers || function() {
              return [
                  {
                      z: 0,
                      draw (chartArea) {
                          item.draw(chartArea);
                      }
                  }
              ];
          };
          chart.boxes.push(item);
      },
   removeBox (chart, layoutItem) {
          const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
          if (index !== -1) {
              chart.boxes.splice(index, 1);
          }
      },
   configure (chart, item, options) {
          item.fullSize = options.fullSize;
          item.position = options.position;
          item.weight = options.weight;
      },
   update (chart, width, height, minPadding) {
          if (!chart) {
              return;
          }
          const padding = toPadding(chart.options.layout.padding);
          const availableWidth = Math.max(width - padding.width, 0);
          const availableHeight = Math.max(height - padding.height, 0);
          const boxes = buildLayoutBoxes(chart.boxes);
          const verticalBoxes = boxes.vertical;
          const horizontalBoxes = boxes.horizontal;
          each(chart.boxes, (box)=>{
              if (typeof box.beforeLayout === 'function') {
                  box.beforeLayout();
              }
          });
          const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap)=>wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
          const params = Object.freeze({
              outerWidth: width,
              outerHeight: height,
              padding,
              availableWidth,
              availableHeight,
              vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
              hBoxMaxHeight: availableHeight / 2
          });
          const maxPadding = Object.assign({}, padding);
          updateMaxPadding(maxPadding, toPadding(minPadding));
          const chartArea = Object.assign({
              maxPadding,
              w: availableWidth,
              h: availableHeight,
              x: padding.left,
              y: padding.top
          }, padding);
          const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
          fitBoxes(boxes.fullSize, chartArea, params, stacks);
          fitBoxes(verticalBoxes, chartArea, params, stacks);
          if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
              fitBoxes(verticalBoxes, chartArea, params, stacks);
          }
          handleMaxPadding(chartArea);
          placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
          chartArea.x += chartArea.w;
          chartArea.y += chartArea.h;
          placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
          chart.chartArea = {
              left: chartArea.left,
              top: chartArea.top,
              right: chartArea.left + chartArea.w,
              bottom: chartArea.top + chartArea.h,
              height: chartArea.h,
              width: chartArea.w
          };
          each(boxes.chartArea, (layout)=>{
              const box = layout.box;
              Object.assign(box, chart.chartArea);
              box.update(chartArea.w, chartArea.h, {
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0
              });
          });
      }
  };

  class BasePlatform {
   acquireContext(canvas, aspectRatio) {}
   releaseContext(context) {
          return false;
      }
   addEventListener(chart, type, listener) {}
   removeEventListener(chart, type, listener) {}
   getDevicePixelRatio() {
          return 1;
      }
   getMaximumSize(element, width, height, aspectRatio) {
          width = Math.max(0, width || element.width);
          height = height || element.height;
          return {
              width,
              height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
          };
      }
   isAttached(canvas) {
          return true;
      }
   updateConfig(config) {
      }
  }

  class BasicPlatform extends BasePlatform {
      acquireContext(item) {
          return item && item.getContext && item.getContext('2d') || null;
      }
      updateConfig(config) {
          config.options.animation = false;
      }
  }

  const EXPANDO_KEY = '$chartjs';
   const EVENT_TYPES = {
      touchstart: 'mousedown',
      touchmove: 'mousemove',
      touchend: 'mouseup',
      pointerenter: 'mouseenter',
      pointerdown: 'mousedown',
      pointermove: 'mousemove',
      pointerup: 'mouseup',
      pointerleave: 'mouseout',
      pointerout: 'mouseout'
  };
  const isNullOrEmpty = (value)=>value === null || value === '';
   function initCanvas(canvas, aspectRatio) {
      const style = canvas.style;
      const renderHeight = canvas.getAttribute('height');
      const renderWidth = canvas.getAttribute('width');
      canvas[EXPANDO_KEY] = {
          initial: {
              height: renderHeight,
              width: renderWidth,
              style: {
                  display: style.display,
                  height: style.height,
                  width: style.width
              }
          }
      };
      style.display = style.display || 'block';
      style.boxSizing = style.boxSizing || 'border-box';
      if (isNullOrEmpty(renderWidth)) {
          const displayWidth = readUsedSize(canvas, 'width');
          if (displayWidth !== undefined) {
              canvas.width = displayWidth;
          }
      }
      if (isNullOrEmpty(renderHeight)) {
          if (canvas.style.height === '') {
              canvas.height = canvas.width / (aspectRatio || 2);
          } else {
              const displayHeight = readUsedSize(canvas, 'height');
              if (displayHeight !== undefined) {
                  canvas.height = displayHeight;
              }
          }
      }
      return canvas;
  }
  const eventListenerOptions = supportsEventListenerOptions ? {
      passive: true
  } : false;
  function addListener(node, type, listener) {
      if (node) {
          node.addEventListener(type, listener, eventListenerOptions);
      }
  }
  function removeListener(chart, type, listener) {
      if (chart && chart.canvas) {
          chart.canvas.removeEventListener(type, listener, eventListenerOptions);
      }
  }
  function fromNativeEvent(event, chart) {
      const type = EVENT_TYPES[event.type] || event.type;
      const { x , y  } = getRelativePosition(event, chart);
      return {
          type,
          chart,
          native: event,
          x: x !== undefined ? x : null,
          y: y !== undefined ? y : null
      };
  }
  function nodeListContains(nodeList, canvas) {
      for (const node of nodeList){
          if (node === canvas || node.contains(canvas)) {
              return true;
          }
      }
  }
  function createAttachObserver(chart, type, listener) {
      const canvas = chart.canvas;
      const observer = new MutationObserver((entries)=>{
          let trigger = false;
          for (const entry of entries){
              trigger = trigger || nodeListContains(entry.addedNodes, canvas);
              trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
          }
          if (trigger) {
              listener();
          }
      });
      observer.observe(document, {
          childList: true,
          subtree: true
      });
      return observer;
  }
  function createDetachObserver(chart, type, listener) {
      const canvas = chart.canvas;
      const observer = new MutationObserver((entries)=>{
          let trigger = false;
          for (const entry of entries){
              trigger = trigger || nodeListContains(entry.removedNodes, canvas);
              trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
          }
          if (trigger) {
              listener();
          }
      });
      observer.observe(document, {
          childList: true,
          subtree: true
      });
      return observer;
  }
  const drpListeningCharts = new Map();
  let oldDevicePixelRatio = 0;
  function onWindowResize() {
      const dpr = window.devicePixelRatio;
      if (dpr === oldDevicePixelRatio) {
          return;
      }
      oldDevicePixelRatio = dpr;
      drpListeningCharts.forEach((resize, chart)=>{
          if (chart.currentDevicePixelRatio !== dpr) {
              resize();
          }
      });
  }
  function listenDevicePixelRatioChanges(chart, resize) {
      if (!drpListeningCharts.size) {
          window.addEventListener('resize', onWindowResize);
      }
      drpListeningCharts.set(chart, resize);
  }
  function unlistenDevicePixelRatioChanges(chart) {
      drpListeningCharts.delete(chart);
      if (!drpListeningCharts.size) {
          window.removeEventListener('resize', onWindowResize);
      }
  }
  function createResizeObserver(chart, type, listener) {
      const canvas = chart.canvas;
      const container = canvas && _getParentNode(canvas);
      if (!container) {
          return;
      }
      const resize = throttled((width, height)=>{
          const w = container.clientWidth;
          listener(width, height);
          if (w < container.clientWidth) {
              listener();
          }
      }, window);
      const observer = new ResizeObserver((entries)=>{
          const entry = entries[0];
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;
          if (width === 0 && height === 0) {
              return;
          }
          resize(width, height);
      });
      observer.observe(container);
      listenDevicePixelRatioChanges(chart, resize);
      return observer;
  }
  function releaseObserver(chart, type, observer) {
      if (observer) {
          observer.disconnect();
      }
      if (type === 'resize') {
          unlistenDevicePixelRatioChanges(chart);
      }
  }
  function createProxyAndListen(chart, type, listener) {
      const canvas = chart.canvas;
      const proxy = throttled((event)=>{
          if (chart.ctx !== null) {
              listener(fromNativeEvent(event, chart));
          }
      }, chart);
      addListener(canvas, type, proxy);
      return proxy;
  }
   class DomPlatform extends BasePlatform {
   acquireContext(canvas, aspectRatio) {
          const context = canvas && canvas.getContext && canvas.getContext('2d');
          if (context && context.canvas === canvas) {
              initCanvas(canvas, aspectRatio);
              return context;
          }
          return null;
      }
   releaseContext(context) {
          const canvas = context.canvas;
          if (!canvas[EXPANDO_KEY]) {
              return false;
          }
          const initial = canvas[EXPANDO_KEY].initial;
          [
              'height',
              'width'
          ].forEach((prop)=>{
              const value = initial[prop];
              if (isNullOrUndef(value)) {
                  canvas.removeAttribute(prop);
              } else {
                  canvas.setAttribute(prop, value);
              }
          });
          const style = initial.style || {};
          Object.keys(style).forEach((key)=>{
              canvas.style[key] = style[key];
          });
          canvas.width = canvas.width;
          delete canvas[EXPANDO_KEY];
          return true;
      }
   addEventListener(chart, type, listener) {
          this.removeEventListener(chart, type);
          const proxies = chart.$proxies || (chart.$proxies = {});
          const handlers = {
              attach: createAttachObserver,
              detach: createDetachObserver,
              resize: createResizeObserver
          };
          const handler = handlers[type] || createProxyAndListen;
          proxies[type] = handler(chart, type, listener);
      }
   removeEventListener(chart, type) {
          const proxies = chart.$proxies || (chart.$proxies = {});
          const proxy = proxies[type];
          if (!proxy) {
              return;
          }
          const handlers = {
              attach: releaseObserver,
              detach: releaseObserver,
              resize: releaseObserver
          };
          const handler = handlers[type] || removeListener;
          handler(chart, type, proxy);
          proxies[type] = undefined;
      }
      getDevicePixelRatio() {
          return window.devicePixelRatio;
      }
   getMaximumSize(canvas, width, height, aspectRatio) {
          return getMaximumSize(canvas, width, height, aspectRatio);
      }
   isAttached(canvas) {
          const container = canvas && _getParentNode(canvas);
          return !!(container && container.isConnected);
      }
  }

  function _detectPlatform(canvas) {
      if (!_isDomSupported() || typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas) {
          return BasicPlatform;
      }
      return DomPlatform;
  }

  class Element {
      static defaults = {};
      static defaultRoutes = undefined;
      x;
      y;
      active = false;
      options;
      $animations;
      tooltipPosition(useFinalPosition) {
          const { x , y  } = this.getProps([
              'x',
              'y'
          ], useFinalPosition);
          return {
              x,
              y
          };
      }
      hasValue() {
          return isNumber(this.x) && isNumber(this.y);
      }
      getProps(props, final) {
          const anims = this.$animations;
          if (!final || !anims) {
              // let's not create an object, if not needed
              return this;
          }
          const ret = {};
          props.forEach((prop)=>{
              ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
          });
          return ret;
      }
  }

  function autoSkip(scale, ticks) {
      const tickOpts = scale.options.ticks;
      const determinedMaxTicks = determineMaxTicks(scale);
      const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
      const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
      const numMajorIndices = majorIndices.length;
      const first = majorIndices[0];
      const last = majorIndices[numMajorIndices - 1];
      const newTicks = [];
      if (numMajorIndices > ticksLimit) {
          skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
          return newTicks;
      }
      const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
      if (numMajorIndices > 0) {
          let i, ilen;
          const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
          skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
          for(i = 0, ilen = numMajorIndices - 1; i < ilen; i++){
              skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
          }
          skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
          return newTicks;
      }
      skip(ticks, newTicks, spacing);
      return newTicks;
  }
  function determineMaxTicks(scale) {
      const offset = scale.options.offset;
      const tickLength = scale._tickSize();
      const maxScale = scale._length / tickLength + (offset ? 0 : 1);
      const maxChart = scale._maxLength / tickLength;
      return Math.floor(Math.min(maxScale, maxChart));
  }
   function calculateSpacing(majorIndices, ticks, ticksLimit) {
      const evenMajorSpacing = getEvenSpacing(majorIndices);
      const spacing = ticks.length / ticksLimit;
      if (!evenMajorSpacing) {
          return Math.max(spacing, 1);
      }
      const factors = _factorize(evenMajorSpacing);
      for(let i = 0, ilen = factors.length - 1; i < ilen; i++){
          const factor = factors[i];
          if (factor > spacing) {
              return factor;
          }
      }
      return Math.max(spacing, 1);
  }
   function getMajorIndices(ticks) {
      const result = [];
      let i, ilen;
      for(i = 0, ilen = ticks.length; i < ilen; i++){
          if (ticks[i].major) {
              result.push(i);
          }
      }
      return result;
  }
   function skipMajors(ticks, newTicks, majorIndices, spacing) {
      let count = 0;
      let next = majorIndices[0];
      let i;
      spacing = Math.ceil(spacing);
      for(i = 0; i < ticks.length; i++){
          if (i === next) {
              newTicks.push(ticks[i]);
              count++;
              next = majorIndices[count * spacing];
          }
      }
  }
   function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
      const start = valueOrDefault(majorStart, 0);
      const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
      let count = 0;
      let length, i, next;
      spacing = Math.ceil(spacing);
      if (majorEnd) {
          length = majorEnd - majorStart;
          spacing = length / Math.floor(length / spacing);
      }
      next = start;
      while(next < 0){
          count++;
          next = Math.round(start + count * spacing);
      }
      for(i = Math.max(start, 0); i < end; i++){
          if (i === next) {
              newTicks.push(ticks[i]);
              count++;
              next = Math.round(start + count * spacing);
          }
      }
  }
   function getEvenSpacing(arr) {
      const len = arr.length;
      let i, diff;
      if (len < 2) {
          return false;
      }
      for(diff = arr[0], i = 1; i < len; ++i){
          if (arr[i] - arr[i - 1] !== diff) {
              return false;
          }
      }
      return diff;
  }

  const reverseAlign = (align)=>align === 'left' ? 'right' : align === 'right' ? 'left' : align;
  const offsetFromEdge = (scale, edge, offset)=>edge === 'top' || edge === 'left' ? scale[edge] + offset : scale[edge] - offset;
  const getTicksLimit = (ticksLength, maxTicksLimit)=>Math.min(maxTicksLimit || ticksLength, ticksLength);
   function sample(arr, numItems) {
      const result = [];
      const increment = arr.length / numItems;
      const len = arr.length;
      let i = 0;
      for(; i < len; i += increment){
          result.push(arr[Math.floor(i)]);
      }
      return result;
  }
   function getPixelForGridLine(scale, index, offsetGridLines) {
      const length = scale.ticks.length;
      const validIndex = Math.min(index, length - 1);
      const start = scale._startPixel;
      const end = scale._endPixel;
      const epsilon = 1e-6;
      let lineValue = scale.getPixelForTick(validIndex);
      let offset;
      if (offsetGridLines) {
          if (length === 1) {
              offset = Math.max(lineValue - start, end - lineValue);
          } else if (index === 0) {
              offset = (scale.getPixelForTick(1) - lineValue) / 2;
          } else {
              offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
          }
          lineValue += validIndex < index ? offset : -offset;
          if (lineValue < start - epsilon || lineValue > end + epsilon) {
              return;
          }
      }
      return lineValue;
  }
   function garbageCollect(caches, length) {
      each(caches, (cache)=>{
          const gc = cache.gc;
          const gcLen = gc.length / 2;
          let i;
          if (gcLen > length) {
              for(i = 0; i < gcLen; ++i){
                  delete cache.data[gc[i]];
              }
              gc.splice(0, gcLen);
          }
      });
  }
   function getTickMarkLength(options) {
      return options.drawTicks ? options.tickLength : 0;
  }
   function getTitleHeight(options, fallback) {
      if (!options.display) {
          return 0;
      }
      const font = toFont(options.font, fallback);
      const padding = toPadding(options.padding);
      const lines = isArray(options.text) ? options.text.length : 1;
      return lines * font.lineHeight + padding.height;
  }
  function createScaleContext(parent, scale) {
      return createContext(parent, {
          scale,
          type: 'scale'
      });
  }
  function createTickContext(parent, index, tick) {
      return createContext(parent, {
          tick,
          index,
          type: 'tick'
      });
  }
  function titleAlign(align, position, reverse) {
       let ret = _toLeftRightCenter(align);
      if (reverse && position !== 'right' || !reverse && position === 'right') {
          ret = reverseAlign(ret);
      }
      return ret;
  }
  function titleArgs(scale, offset, position, align) {
      const { top , left , bottom , right , chart  } = scale;
      const { chartArea , scales  } = chart;
      let rotation = 0;
      let maxWidth, titleX, titleY;
      const height = bottom - top;
      const width = right - left;
      if (scale.isHorizontal()) {
          titleX = _alignStartEnd(align, left, right);
          if (isObject(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
          } else if (position === 'center') {
              titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
          } else {
              titleY = offsetFromEdge(scale, position, offset);
          }
          maxWidth = right - left;
      } else {
          if (isObject(position)) {
              const positionAxisID = Object.keys(position)[0];
              const value = position[positionAxisID];
              titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
          } else if (position === 'center') {
              titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
          } else {
              titleX = offsetFromEdge(scale, position, offset);
          }
          titleY = _alignStartEnd(align, bottom, top);
          rotation = position === 'left' ? -HALF_PI : HALF_PI;
      }
      return {
          titleX,
          titleY,
          maxWidth,
          rotation
      };
  }
  class Scale extends Element {
      constructor(cfg){
          super();
           this.id = cfg.id;
           this.type = cfg.type;
           this.options = undefined;
           this.ctx = cfg.ctx;
           this.chart = cfg.chart;
           this.top = undefined;
           this.bottom = undefined;
           this.left = undefined;
           this.right = undefined;
           this.width = undefined;
           this.height = undefined;
          this._margins = {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          };
           this.maxWidth = undefined;
           this.maxHeight = undefined;
           this.paddingTop = undefined;
           this.paddingBottom = undefined;
           this.paddingLeft = undefined;
           this.paddingRight = undefined;
           this.axis = undefined;
           this.labelRotation = undefined;
          this.min = undefined;
          this.max = undefined;
          this._range = undefined;
           this.ticks = [];
           this._gridLineItems = null;
           this._labelItems = null;
           this._labelSizes = null;
          this._length = 0;
          this._maxLength = 0;
          this._longestTextCache = {};
           this._startPixel = undefined;
           this._endPixel = undefined;
          this._reversePixels = false;
          this._userMax = undefined;
          this._userMin = undefined;
          this._suggestedMax = undefined;
          this._suggestedMin = undefined;
          this._ticksLength = 0;
          this._borderValue = 0;
          this._cache = {};
          this._dataLimitsCached = false;
          this.$context = undefined;
      }
   init(options) {
          this.options = options.setContext(this.getContext());
          this.axis = options.axis;
          this._userMin = this.parse(options.min);
          this._userMax = this.parse(options.max);
          this._suggestedMin = this.parse(options.suggestedMin);
          this._suggestedMax = this.parse(options.suggestedMax);
      }
   parse(raw, index) {
          return raw;
      }
   getUserBounds() {
          let { _userMin , _userMax , _suggestedMin , _suggestedMax  } = this;
          _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
          _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
          _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
          _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
          return {
              min: finiteOrDefault(_userMin, _suggestedMin),
              max: finiteOrDefault(_userMax, _suggestedMax),
              minDefined: isNumberFinite(_userMin),
              maxDefined: isNumberFinite(_userMax)
          };
      }
   getMinMax(canStack) {
          let { min , max , minDefined , maxDefined  } = this.getUserBounds();
          let range;
          if (minDefined && maxDefined) {
              return {
                  min,
                  max
              };
          }
          const metas = this.getMatchingVisibleMetas();
          for(let i = 0, ilen = metas.length; i < ilen; ++i){
              range = metas[i].controller.getMinMax(this, canStack);
              if (!minDefined) {
                  min = Math.min(min, range.min);
              }
              if (!maxDefined) {
                  max = Math.max(max, range.max);
              }
          }
          min = maxDefined && min > max ? max : min;
          max = minDefined && min > max ? min : max;
          return {
              min: finiteOrDefault(min, finiteOrDefault(max, min)),
              max: finiteOrDefault(max, finiteOrDefault(min, max))
          };
      }
   getPadding() {
          return {
              left: this.paddingLeft || 0,
              top: this.paddingTop || 0,
              right: this.paddingRight || 0,
              bottom: this.paddingBottom || 0
          };
      }
   getTicks() {
          return this.ticks;
      }
   getLabels() {
          const data = this.chart.data;
          return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
      }
   getLabelItems(chartArea = this.chart.chartArea) {
          const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
          return items;
      }
      beforeLayout() {
          this._cache = {};
          this._dataLimitsCached = false;
      }
      beforeUpdate() {
          callback(this.options.beforeUpdate, [
              this
          ]);
      }
   update(maxWidth, maxHeight, margins) {
          const { beginAtZero , grace , ticks: tickOpts  } = this.options;
          const sampleSize = tickOpts.sampleSize;
          this.beforeUpdate();
          this.maxWidth = maxWidth;
          this.maxHeight = maxHeight;
          this._margins = margins = Object.assign({
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }, margins);
          this.ticks = null;
          this._labelSizes = null;
          this._gridLineItems = null;
          this._labelItems = null;
          this.beforeSetDimensions();
          this.setDimensions();
          this.afterSetDimensions();
          this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
          if (!this._dataLimitsCached) {
              this.beforeDataLimits();
              this.determineDataLimits();
              this.afterDataLimits();
              this._range = _addGrace(this, grace, beginAtZero);
              this._dataLimitsCached = true;
          }
          this.beforeBuildTicks();
          this.ticks = this.buildTicks() || [];
          this.afterBuildTicks();
          const samplingEnabled = sampleSize < this.ticks.length;
          this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
          this.configure();
          this.beforeCalculateLabelRotation();
          this.calculateLabelRotation();
          this.afterCalculateLabelRotation();
          if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto')) {
              this.ticks = autoSkip(this, this.ticks);
              this._labelSizes = null;
              this.afterAutoSkip();
          }
          if (samplingEnabled) {
              this._convertTicksToLabels(this.ticks);
          }
          this.beforeFit();
          this.fit();
          this.afterFit();
          this.afterUpdate();
      }
   configure() {
          let reversePixels = this.options.reverse;
          let startPixel, endPixel;
          if (this.isHorizontal()) {
              startPixel = this.left;
              endPixel = this.right;
          } else {
              startPixel = this.top;
              endPixel = this.bottom;
              reversePixels = !reversePixels;
          }
          this._startPixel = startPixel;
          this._endPixel = endPixel;
          this._reversePixels = reversePixels;
          this._length = endPixel - startPixel;
          this._alignToPixels = this.options.alignToPixels;
      }
      afterUpdate() {
          callback(this.options.afterUpdate, [
              this
          ]);
      }
      beforeSetDimensions() {
          callback(this.options.beforeSetDimensions, [
              this
          ]);
      }
      setDimensions() {
          if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = 0;
              this.right = this.width;
          } else {
              this.height = this.maxHeight;
              this.top = 0;
              this.bottom = this.height;
          }
          this.paddingLeft = 0;
          this.paddingTop = 0;
          this.paddingRight = 0;
          this.paddingBottom = 0;
      }
      afterSetDimensions() {
          callback(this.options.afterSetDimensions, [
              this
          ]);
      }
      _callHooks(name) {
          this.chart.notifyPlugins(name, this.getContext());
          callback(this.options[name], [
              this
          ]);
      }
      beforeDataLimits() {
          this._callHooks('beforeDataLimits');
      }
      determineDataLimits() {}
      afterDataLimits() {
          this._callHooks('afterDataLimits');
      }
      beforeBuildTicks() {
          this._callHooks('beforeBuildTicks');
      }
   buildTicks() {
          return [];
      }
      afterBuildTicks() {
          this._callHooks('afterBuildTicks');
      }
      beforeTickToLabelConversion() {
          callback(this.options.beforeTickToLabelConversion, [
              this
          ]);
      }
   generateTickLabels(ticks) {
          const tickOpts = this.options.ticks;
          let i, ilen, tick;
          for(i = 0, ilen = ticks.length; i < ilen; i++){
              tick = ticks[i];
              tick.label = callback(tickOpts.callback, [
                  tick.value,
                  i,
                  ticks
              ], this);
          }
      }
      afterTickToLabelConversion() {
          callback(this.options.afterTickToLabelConversion, [
              this
          ]);
      }
      beforeCalculateLabelRotation() {
          callback(this.options.beforeCalculateLabelRotation, [
              this
          ]);
      }
      calculateLabelRotation() {
          const options = this.options;
          const tickOpts = options.ticks;
          const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
          const minRotation = tickOpts.minRotation || 0;
          const maxRotation = tickOpts.maxRotation;
          let labelRotation = minRotation;
          let tickWidth, maxHeight, maxLabelDiagonal;
          if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
              this.labelRotation = minRotation;
              return;
          }
          const labelSizes = this._getLabelSizes();
          const maxLabelWidth = labelSizes.widest.width;
          const maxLabelHeight = labelSizes.highest.height;
          const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
          tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
          if (maxLabelWidth + 6 > tickWidth) {
              tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
              maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
              maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
              labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
              labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
          }
          this.labelRotation = labelRotation;
      }
      afterCalculateLabelRotation() {
          callback(this.options.afterCalculateLabelRotation, [
              this
          ]);
      }
      afterAutoSkip() {}
      beforeFit() {
          callback(this.options.beforeFit, [
              this
          ]);
      }
      fit() {
          const minSize = {
              width: 0,
              height: 0
          };
          const { chart , options: { ticks: tickOpts , title: titleOpts , grid: gridOpts  }  } = this;
          const display = this._isVisible();
          const isHorizontal = this.isHorizontal();
          if (display) {
              const titleHeight = getTitleHeight(titleOpts, chart.options.font);
              if (isHorizontal) {
                  minSize.width = this.maxWidth;
                  minSize.height = getTickMarkLength(gridOpts) + titleHeight;
              } else {
                  minSize.height = this.maxHeight;
                  minSize.width = getTickMarkLength(gridOpts) + titleHeight;
              }
              if (tickOpts.display && this.ticks.length) {
                  const { first , last , widest , highest  } = this._getLabelSizes();
                  const tickPadding = tickOpts.padding * 2;
                  const angleRadians = toRadians(this.labelRotation);
                  const cos = Math.cos(angleRadians);
                  const sin = Math.sin(angleRadians);
                  if (isHorizontal) {
                      const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                      minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                  } else {
                      const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                      minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                  }
                  this._calculatePadding(first, last, sin, cos);
              }
          }
          this._handleMargins();
          if (isHorizontal) {
              this.width = this._length = chart.width - this._margins.left - this._margins.right;
              this.height = minSize.height;
          } else {
              this.width = minSize.width;
              this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
          }
      }
      _calculatePadding(first, last, sin, cos) {
          const { ticks: { align , padding  } , position  } = this.options;
          const isRotated = this.labelRotation !== 0;
          const labelsBelowTicks = position !== 'top' && this.axis === 'x';
          if (this.isHorizontal()) {
              const offsetLeft = this.getPixelForTick(0) - this.left;
              const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
              let paddingLeft = 0;
              let paddingRight = 0;
              if (isRotated) {
                  if (labelsBelowTicks) {
                      paddingLeft = cos * first.width;
                      paddingRight = sin * last.height;
                  } else {
                      paddingLeft = sin * first.height;
                      paddingRight = cos * last.width;
                  }
              } else if (align === 'start') {
                  paddingRight = last.width;
              } else if (align === 'end') {
                  paddingLeft = first.width;
              } else if (align !== 'inner') {
                  paddingLeft = first.width / 2;
                  paddingRight = last.width / 2;
              }
              this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
              this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
          } else {
              let paddingTop = last.height / 2;
              let paddingBottom = first.height / 2;
              if (align === 'start') {
                  paddingTop = 0;
                  paddingBottom = first.height;
              } else if (align === 'end') {
                  paddingTop = last.height;
                  paddingBottom = 0;
              }
              this.paddingTop = paddingTop + padding;
              this.paddingBottom = paddingBottom + padding;
          }
      }
   _handleMargins() {
          if (this._margins) {
              this._margins.left = Math.max(this.paddingLeft, this._margins.left);
              this._margins.top = Math.max(this.paddingTop, this._margins.top);
              this._margins.right = Math.max(this.paddingRight, this._margins.right);
              this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
          }
      }
      afterFit() {
          callback(this.options.afterFit, [
              this
          ]);
      }
   isHorizontal() {
          const { axis , position  } = this.options;
          return position === 'top' || position === 'bottom' || axis === 'x';
      }
   isFullSize() {
          return this.options.fullSize;
      }
   _convertTicksToLabels(ticks) {
          this.beforeTickToLabelConversion();
          this.generateTickLabels(ticks);
          let i, ilen;
          for(i = 0, ilen = ticks.length; i < ilen; i++){
              if (isNullOrUndef(ticks[i].label)) {
                  ticks.splice(i, 1);
                  ilen--;
                  i--;
              }
          }
          this.afterTickToLabelConversion();
      }
   _getLabelSizes() {
          let labelSizes = this._labelSizes;
          if (!labelSizes) {
              const sampleSize = this.options.ticks.sampleSize;
              let ticks = this.ticks;
              if (sampleSize < ticks.length) {
                  ticks = sample(ticks, sampleSize);
              }
              this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
          }
          return labelSizes;
      }
   _computeLabelSizes(ticks, length, maxTicksLimit) {
          const { ctx , _longestTextCache: caches  } = this;
          const widths = [];
          const heights = [];
          const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
          let widestLabelSize = 0;
          let highestLabelSize = 0;
          let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
          for(i = 0; i < length; i += increment){
              label = ticks[i].label;
              tickFont = this._resolveTickFontOptions(i);
              ctx.font = fontString = tickFont.string;
              cache = caches[fontString] = caches[fontString] || {
                  data: {},
                  gc: []
              };
              lineHeight = tickFont.lineHeight;
              width = height = 0;
              if (!isNullOrUndef(label) && !isArray(label)) {
                  width = _measureText(ctx, cache.data, cache.gc, width, label);
                  height = lineHeight;
              } else if (isArray(label)) {
                  for(j = 0, jlen = label.length; j < jlen; ++j){
                      nestedLabel =  label[j];
                      if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                          width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                          height += lineHeight;
                      }
                  }
              }
              widths.push(width);
              heights.push(height);
              widestLabelSize = Math.max(width, widestLabelSize);
              highestLabelSize = Math.max(height, highestLabelSize);
          }
          garbageCollect(caches, length);
          const widest = widths.indexOf(widestLabelSize);
          const highest = heights.indexOf(highestLabelSize);
          const valueAt = (idx)=>({
                  width: widths[idx] || 0,
                  height: heights[idx] || 0
              });
          return {
              first: valueAt(0),
              last: valueAt(length - 1),
              widest: valueAt(widest),
              highest: valueAt(highest),
              widths,
              heights
          };
      }
   getLabelForValue(value) {
          return value;
      }
   getPixelForValue(value, index) {
          return NaN;
      }
   getValueForPixel(pixel) {}
   getPixelForTick(index) {
          const ticks = this.ticks;
          if (index < 0 || index > ticks.length - 1) {
              return null;
          }
          return this.getPixelForValue(ticks[index].value);
      }
   getPixelForDecimal(decimal) {
          if (this._reversePixels) {
              decimal = 1 - decimal;
          }
          const pixel = this._startPixel + decimal * this._length;
          return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
      }
   getDecimalForPixel(pixel) {
          const decimal = (pixel - this._startPixel) / this._length;
          return this._reversePixels ? 1 - decimal : decimal;
      }
   getBasePixel() {
          return this.getPixelForValue(this.getBaseValue());
      }
   getBaseValue() {
          const { min , max  } = this;
          return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
      }
   getContext(index) {
          const ticks = this.ticks || [];
          if (index >= 0 && index < ticks.length) {
              const tick = ticks[index];
              return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
          }
          return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
      }
   _tickSize() {
          const optionTicks = this.options.ticks;
          const rot = toRadians(this.labelRotation);
          const cos = Math.abs(Math.cos(rot));
          const sin = Math.abs(Math.sin(rot));
          const labelSizes = this._getLabelSizes();
          const padding = optionTicks.autoSkipPadding || 0;
          const w = labelSizes ? labelSizes.widest.width + padding : 0;
          const h = labelSizes ? labelSizes.highest.height + padding : 0;
          return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
      }
   _isVisible() {
          const display = this.options.display;
          if (display !== 'auto') {
              return !!display;
          }
          return this.getMatchingVisibleMetas().length > 0;
      }
   _computeGridLineItems(chartArea) {
          const axis = this.axis;
          const chart = this.chart;
          const options = this.options;
          const { grid , position , border  } = options;
          const offset = grid.offset;
          const isHorizontal = this.isHorizontal();
          const ticks = this.ticks;
          const ticksLength = ticks.length + (offset ? 1 : 0);
          const tl = getTickMarkLength(grid);
          const items = [];
          const borderOpts = border.setContext(this.getContext());
          const axisWidth = borderOpts.display ? borderOpts.width : 0;
          const axisHalfWidth = axisWidth / 2;
          const alignBorderValue = function(pixel) {
              return _alignPixel(chart, pixel, axisWidth);
          };
          let borderValue, i, lineValue, alignedLineValue;
          let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
          if (position === 'top') {
              borderValue = alignBorderValue(this.bottom);
              ty1 = this.bottom - tl;
              ty2 = borderValue - axisHalfWidth;
              y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
              y2 = chartArea.bottom;
          } else if (position === 'bottom') {
              borderValue = alignBorderValue(this.top);
              y1 = chartArea.top;
              y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
              ty1 = borderValue + axisHalfWidth;
              ty2 = this.top + tl;
          } else if (position === 'left') {
              borderValue = alignBorderValue(this.right);
              tx1 = this.right - tl;
              tx2 = borderValue - axisHalfWidth;
              x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
              x2 = chartArea.right;
          } else if (position === 'right') {
              borderValue = alignBorderValue(this.left);
              x1 = chartArea.left;
              x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
              tx1 = borderValue + axisHalfWidth;
              tx2 = this.left + tl;
          } else if (axis === 'x') {
              if (position === 'center') {
                  borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
              } else if (isObject(position)) {
                  const positionAxisID = Object.keys(position)[0];
                  const value = position[positionAxisID];
                  borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
              }
              y1 = chartArea.top;
              y2 = chartArea.bottom;
              ty1 = borderValue + axisHalfWidth;
              ty2 = ty1 + tl;
          } else if (axis === 'y') {
              if (position === 'center') {
                  borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
              } else if (isObject(position)) {
                  const positionAxisID = Object.keys(position)[0];
                  const value = position[positionAxisID];
                  borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
              }
              tx1 = borderValue - axisHalfWidth;
              tx2 = tx1 - tl;
              x1 = chartArea.left;
              x2 = chartArea.right;
          }
          const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
          const step = Math.max(1, Math.ceil(ticksLength / limit));
          for(i = 0; i < ticksLength; i += step){
              const context = this.getContext(i);
              const optsAtIndex = grid.setContext(context);
              const optsAtIndexBorder = border.setContext(context);
              const lineWidth = optsAtIndex.lineWidth;
              const lineColor = optsAtIndex.color;
              const borderDash = optsAtIndexBorder.dash || [];
              const borderDashOffset = optsAtIndexBorder.dashOffset;
              const tickWidth = optsAtIndex.tickWidth;
              const tickColor = optsAtIndex.tickColor;
              const tickBorderDash = optsAtIndex.tickBorderDash || [];
              const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
              lineValue = getPixelForGridLine(this, i, offset);
              if (lineValue === undefined) {
                  continue;
              }
              alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
              if (isHorizontal) {
                  tx1 = tx2 = x1 = x2 = alignedLineValue;
              } else {
                  ty1 = ty2 = y1 = y2 = alignedLineValue;
              }
              items.push({
                  tx1,
                  ty1,
                  tx2,
                  ty2,
                  x1,
                  y1,
                  x2,
                  y2,
                  width: lineWidth,
                  color: lineColor,
                  borderDash,
                  borderDashOffset,
                  tickWidth,
                  tickColor,
                  tickBorderDash,
                  tickBorderDashOffset
              });
          }
          this._ticksLength = ticksLength;
          this._borderValue = borderValue;
          return items;
      }
   _computeLabelItems(chartArea) {
          const axis = this.axis;
          const options = this.options;
          const { position , ticks: optionTicks  } = options;
          const isHorizontal = this.isHorizontal();
          const ticks = this.ticks;
          const { align , crossAlign , padding , mirror  } = optionTicks;
          const tl = getTickMarkLength(options.grid);
          const tickAndPadding = tl + padding;
          const hTickAndPadding = mirror ? -padding : tickAndPadding;
          const rotation = -toRadians(this.labelRotation);
          const items = [];
          let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
          let textBaseline = 'middle';
          if (position === 'top') {
              y = this.bottom - hTickAndPadding;
              textAlign = this._getXAxisLabelAlignment();
          } else if (position === 'bottom') {
              y = this.top + hTickAndPadding;
              textAlign = this._getXAxisLabelAlignment();
          } else if (position === 'left') {
              const ret = this._getYAxisLabelAlignment(tl);
              textAlign = ret.textAlign;
              x = ret.x;
          } else if (position === 'right') {
              const ret = this._getYAxisLabelAlignment(tl);
              textAlign = ret.textAlign;
              x = ret.x;
          } else if (axis === 'x') {
              if (position === 'center') {
                  y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
              } else if (isObject(position)) {
                  const positionAxisID = Object.keys(position)[0];
                  const value = position[positionAxisID];
                  y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
              }
              textAlign = this._getXAxisLabelAlignment();
          } else if (axis === 'y') {
              if (position === 'center') {
                  x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
              } else if (isObject(position)) {
                  const positionAxisID = Object.keys(position)[0];
                  const value = position[positionAxisID];
                  x = this.chart.scales[positionAxisID].getPixelForValue(value);
              }
              textAlign = this._getYAxisLabelAlignment(tl).textAlign;
          }
          if (axis === 'y') {
              if (align === 'start') {
                  textBaseline = 'top';
              } else if (align === 'end') {
                  textBaseline = 'bottom';
              }
          }
          const labelSizes = this._getLabelSizes();
          for(i = 0, ilen = ticks.length; i < ilen; ++i){
              tick = ticks[i];
              label = tick.label;
              const optsAtIndex = optionTicks.setContext(this.getContext(i));
              pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
              font = this._resolveTickFontOptions(i);
              lineHeight = font.lineHeight;
              lineCount = isArray(label) ? label.length : 1;
              const halfCount = lineCount / 2;
              const color = optsAtIndex.color;
              const strokeColor = optsAtIndex.textStrokeColor;
              const strokeWidth = optsAtIndex.textStrokeWidth;
              let tickTextAlign = textAlign;
              if (isHorizontal) {
                  x = pixel;
                  if (textAlign === 'inner') {
                      if (i === ilen - 1) {
                          tickTextAlign = !this.options.reverse ? 'right' : 'left';
                      } else if (i === 0) {
                          tickTextAlign = !this.options.reverse ? 'left' : 'right';
                      } else {
                          tickTextAlign = 'center';
                      }
                  }
                  if (position === 'top') {
                      if (crossAlign === 'near' || rotation !== 0) {
                          textOffset = -lineCount * lineHeight + lineHeight / 2;
                      } else if (crossAlign === 'center') {
                          textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
                      } else {
                          textOffset = -labelSizes.highest.height + lineHeight / 2;
                      }
                  } else {
                      if (crossAlign === 'near' || rotation !== 0) {
                          textOffset = lineHeight / 2;
                      } else if (crossAlign === 'center') {
                          textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
                      } else {
                          textOffset = labelSizes.highest.height - lineCount * lineHeight;
                      }
                  }
                  if (mirror) {
                      textOffset *= -1;
                  }
                  if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
                      x += lineHeight / 2 * Math.sin(rotation);
                  }
              } else {
                  y = pixel;
                  textOffset = (1 - lineCount) * lineHeight / 2;
              }
              let backdrop;
              if (optsAtIndex.showLabelBackdrop) {
                  const labelPadding = toPadding(optsAtIndex.backdropPadding);
                  const height = labelSizes.heights[i];
                  const width = labelSizes.widths[i];
                  let top = textOffset - labelPadding.top;
                  let left = 0 - labelPadding.left;
                  switch(textBaseline){
                      case 'middle':
                          top -= height / 2;
                          break;
                      case 'bottom':
                          top -= height;
                          break;
                  }
                  switch(textAlign){
                      case 'center':
                          left -= width / 2;
                          break;
                      case 'right':
                          left -= width;
                          break;
                      case 'inner':
                          if (i === ilen - 1) {
                              left -= width;
                          } else if (i > 0) {
                              left -= width / 2;
                          }
                          break;
                  }
                  backdrop = {
                      left,
                      top,
                      width: width + labelPadding.width,
                      height: height + labelPadding.height,
                      color: optsAtIndex.backdropColor
                  };
              }
              items.push({
                  label,
                  font,
                  textOffset,
                  options: {
                      rotation,
                      color,
                      strokeColor,
                      strokeWidth,
                      textAlign: tickTextAlign,
                      textBaseline,
                      translation: [
                          x,
                          y
                      ],
                      backdrop
                  }
              });
          }
          return items;
      }
      _getXAxisLabelAlignment() {
          const { position , ticks  } = this.options;
          const rotation = -toRadians(this.labelRotation);
          if (rotation) {
              return position === 'top' ? 'left' : 'right';
          }
          let align = 'center';
          if (ticks.align === 'start') {
              align = 'left';
          } else if (ticks.align === 'end') {
              align = 'right';
          } else if (ticks.align === 'inner') {
              align = 'inner';
          }
          return align;
      }
      _getYAxisLabelAlignment(tl) {
          const { position , ticks: { crossAlign , mirror , padding  }  } = this.options;
          const labelSizes = this._getLabelSizes();
          const tickAndPadding = tl + padding;
          const widest = labelSizes.widest.width;
          let textAlign;
          let x;
          if (position === 'left') {
              if (mirror) {
                  x = this.right + padding;
                  if (crossAlign === 'near') {
                      textAlign = 'left';
                  } else if (crossAlign === 'center') {
                      textAlign = 'center';
                      x += widest / 2;
                  } else {
                      textAlign = 'right';
                      x += widest;
                  }
              } else {
                  x = this.right - tickAndPadding;
                  if (crossAlign === 'near') {
                      textAlign = 'right';
                  } else if (crossAlign === 'center') {
                      textAlign = 'center';
                      x -= widest / 2;
                  } else {
                      textAlign = 'left';
                      x = this.left;
                  }
              }
          } else if (position === 'right') {
              if (mirror) {
                  x = this.left + padding;
                  if (crossAlign === 'near') {
                      textAlign = 'right';
                  } else if (crossAlign === 'center') {
                      textAlign = 'center';
                      x -= widest / 2;
                  } else {
                      textAlign = 'left';
                      x -= widest;
                  }
              } else {
                  x = this.left + tickAndPadding;
                  if (crossAlign === 'near') {
                      textAlign = 'left';
                  } else if (crossAlign === 'center') {
                      textAlign = 'center';
                      x += widest / 2;
                  } else {
                      textAlign = 'right';
                      x = this.right;
                  }
              }
          } else {
              textAlign = 'right';
          }
          return {
              textAlign,
              x
          };
      }
   _computeLabelArea() {
          if (this.options.ticks.mirror) {
              return;
          }
          const chart = this.chart;
          const position = this.options.position;
          if (position === 'left' || position === 'right') {
              return {
                  top: 0,
                  left: this.left,
                  bottom: chart.height,
                  right: this.right
              };
          }
          if (position === 'top' || position === 'bottom') {
              return {
                  top: this.top,
                  left: 0,
                  bottom: this.bottom,
                  right: chart.width
              };
          }
      }
   drawBackground() {
          const { ctx , options: { backgroundColor  } , left , top , width , height  } = this;
          if (backgroundColor) {
              ctx.save();
              ctx.fillStyle = backgroundColor;
              ctx.fillRect(left, top, width, height);
              ctx.restore();
          }
      }
      getLineWidthForValue(value) {
          const grid = this.options.grid;
          if (!this._isVisible() || !grid.display) {
              return 0;
          }
          const ticks = this.ticks;
          const index = ticks.findIndex((t)=>t.value === value);
          if (index >= 0) {
              const opts = grid.setContext(this.getContext(index));
              return opts.lineWidth;
          }
          return 0;
      }
   drawGrid(chartArea) {
          const grid = this.options.grid;
          const ctx = this.ctx;
          const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
          let i, ilen;
          const drawLine = (p1, p2, style)=>{
              if (!style.width || !style.color) {
                  return;
              }
              ctx.save();
              ctx.lineWidth = style.width;
              ctx.strokeStyle = style.color;
              ctx.setLineDash(style.borderDash || []);
              ctx.lineDashOffset = style.borderDashOffset;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.restore();
          };
          if (grid.display) {
              for(i = 0, ilen = items.length; i < ilen; ++i){
                  const item = items[i];
                  if (grid.drawOnChartArea) {
                      drawLine({
                          x: item.x1,
                          y: item.y1
                      }, {
                          x: item.x2,
                          y: item.y2
                      }, item);
                  }
                  if (grid.drawTicks) {
                      drawLine({
                          x: item.tx1,
                          y: item.ty1
                      }, {
                          x: item.tx2,
                          y: item.ty2
                      }, {
                          color: item.tickColor,
                          width: item.tickWidth,
                          borderDash: item.tickBorderDash,
                          borderDashOffset: item.tickBorderDashOffset
                      });
                  }
              }
          }
      }
   drawBorder() {
          const { chart , ctx , options: { border , grid  }  } = this;
          const borderOpts = border.setContext(this.getContext());
          const axisWidth = border.display ? borderOpts.width : 0;
          if (!axisWidth) {
              return;
          }
          const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
          const borderValue = this._borderValue;
          let x1, x2, y1, y2;
          if (this.isHorizontal()) {
              x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
              x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
              y1 = y2 = borderValue;
          } else {
              y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
              y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
              x1 = x2 = borderValue;
          }
          ctx.save();
          ctx.lineWidth = borderOpts.width;
          ctx.strokeStyle = borderOpts.color;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.restore();
      }
   drawLabels(chartArea) {
          const optionTicks = this.options.ticks;
          if (!optionTicks.display) {
              return;
          }
          const ctx = this.ctx;
          const area = this._computeLabelArea();
          if (area) {
              clipArea(ctx, area);
          }
          const items = this.getLabelItems(chartArea);
          for (const item of items){
              const renderTextOptions = item.options;
              const tickFont = item.font;
              const label = item.label;
              const y = item.textOffset;
              renderText(ctx, label, 0, y, tickFont, renderTextOptions);
          }
          if (area) {
              unclipArea(ctx);
          }
      }
   drawTitle() {
          const { ctx , options: { position , title , reverse  }  } = this;
          if (!title.display) {
              return;
          }
          const font = toFont(title.font);
          const padding = toPadding(title.padding);
          const align = title.align;
          let offset = font.lineHeight / 2;
          if (position === 'bottom' || position === 'center' || isObject(position)) {
              offset += padding.bottom;
              if (isArray(title.text)) {
                  offset += font.lineHeight * (title.text.length - 1);
              }
          } else {
              offset += padding.top;
          }
          const { titleX , titleY , maxWidth , rotation  } = titleArgs(this, offset, position, align);
          renderText(ctx, title.text, 0, 0, font, {
              color: title.color,
              maxWidth,
              rotation,
              textAlign: titleAlign(align, position, reverse),
              textBaseline: 'middle',
              translation: [
                  titleX,
                  titleY
              ]
          });
      }
      draw(chartArea) {
          if (!this._isVisible()) {
              return;
          }
          this.drawBackground();
          this.drawGrid(chartArea);
          this.drawBorder();
          this.drawTitle();
          this.drawLabels(chartArea);
      }
   _layers() {
          const opts = this.options;
          const tz = opts.ticks && opts.ticks.z || 0;
          const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
          const bz = valueOrDefault(opts.border && opts.border.z, 0);
          if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
              return [
                  {
                      z: tz,
                      draw: (chartArea)=>{
                          this.draw(chartArea);
                      }
                  }
              ];
          }
          return [
              {
                  z: gz,
                  draw: (chartArea)=>{
                      this.drawBackground();
                      this.drawGrid(chartArea);
                      this.drawTitle();
                  }
              },
              {
                  z: bz,
                  draw: ()=>{
                      this.drawBorder();
                  }
              },
              {
                  z: tz,
                  draw: (chartArea)=>{
                      this.drawLabels(chartArea);
                  }
              }
          ];
      }
   getMatchingVisibleMetas(type) {
          const metas = this.chart.getSortedVisibleDatasetMetas();
          const axisID = this.axis + 'AxisID';
          const result = [];
          let i, ilen;
          for(i = 0, ilen = metas.length; i < ilen; ++i){
              const meta = metas[i];
              if (meta[axisID] === this.id && (!type || meta.type === type)) {
                  result.push(meta);
              }
          }
          return result;
      }
   _resolveTickFontOptions(index) {
          const opts = this.options.ticks.setContext(this.getContext(index));
          return toFont(opts.font);
      }
   _maxDigits() {
          const fontSize = this._resolveTickFontOptions(0).lineHeight;
          return (this.isHorizontal() ? this.width : this.height) / fontSize;
      }
  }

  class TypedRegistry {
      constructor(type, scope, override){
          this.type = type;
          this.scope = scope;
          this.override = override;
          this.items = Object.create(null);
      }
      isForType(type) {
          return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
      }
   register(item) {
          const proto = Object.getPrototypeOf(item);
          let parentScope;
          if (isIChartComponent(proto)) {
              parentScope = this.register(proto);
          }
          const items = this.items;
          const id = item.id;
          const scope = this.scope + '.' + id;
          if (!id) {
              throw new Error('class does not have id: ' + item);
          }
          if (id in items) {
              return scope;
          }
          items[id] = item;
          registerDefaults(item, scope, parentScope);
          if (this.override) {
              defaults.override(item.id, item.overrides);
          }
          return scope;
      }
   get(id) {
          return this.items[id];
      }
   unregister(item) {
          const items = this.items;
          const id = item.id;
          const scope = this.scope;
          if (id in items) {
              delete items[id];
          }
          if (scope && id in defaults[scope]) {
              delete defaults[scope][id];
              if (this.override) {
                  delete overrides[id];
              }
          }
      }
  }
  function registerDefaults(item, scope, parentScope) {
      const itemDefaults = merge(Object.create(null), [
          parentScope ? defaults.get(parentScope) : {},
          defaults.get(scope),
          item.defaults
      ]);
      defaults.set(scope, itemDefaults);
      if (item.defaultRoutes) {
          routeDefaults(scope, item.defaultRoutes);
      }
      if (item.descriptors) {
          defaults.describe(scope, item.descriptors);
      }
  }
  function routeDefaults(scope, routes) {
      Object.keys(routes).forEach((property)=>{
          const propertyParts = property.split('.');
          const sourceName = propertyParts.pop();
          const sourceScope = [
              scope
          ].concat(propertyParts).join('.');
          const parts = routes[property].split('.');
          const targetName = parts.pop();
          const targetScope = parts.join('.');
          defaults.route(sourceScope, sourceName, targetScope, targetName);
      });
  }
  function isIChartComponent(proto) {
      return 'id' in proto && 'defaults' in proto;
  }

  class Registry {
      constructor(){
          this.controllers = new TypedRegistry(DatasetController, 'datasets', true);
          this.elements = new TypedRegistry(Element, 'elements');
          this.plugins = new TypedRegistry(Object, 'plugins');
          this.scales = new TypedRegistry(Scale, 'scales');
          this._typedRegistries = [
              this.controllers,
              this.scales,
              this.elements
          ];
      }
   add(...args) {
          this._each('register', args);
      }
      remove(...args) {
          this._each('unregister', args);
      }
   addControllers(...args) {
          this._each('register', args, this.controllers);
      }
   addElements(...args) {
          this._each('register', args, this.elements);
      }
   addPlugins(...args) {
          this._each('register', args, this.plugins);
      }
   addScales(...args) {
          this._each('register', args, this.scales);
      }
   getController(id) {
          return this._get(id, this.controllers, 'controller');
      }
   getElement(id) {
          return this._get(id, this.elements, 'element');
      }
   getPlugin(id) {
          return this._get(id, this.plugins, 'plugin');
      }
   getScale(id) {
          return this._get(id, this.scales, 'scale');
      }
   removeControllers(...args) {
          this._each('unregister', args, this.controllers);
      }
   removeElements(...args) {
          this._each('unregister', args, this.elements);
      }
   removePlugins(...args) {
          this._each('unregister', args, this.plugins);
      }
   removeScales(...args) {
          this._each('unregister', args, this.scales);
      }
   _each(method, args, typedRegistry) {
          [
              ...args
          ].forEach((arg)=>{
              const reg = typedRegistry || this._getRegistryForType(arg);
              if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
                  this._exec(method, reg, arg);
              } else {
                  each(arg, (item)=>{
                      const itemReg = typedRegistry || this._getRegistryForType(item);
                      this._exec(method, itemReg, item);
                  });
              }
          });
      }
   _exec(method, registry, component) {
          const camelMethod = _capitalize(method);
          callback(component['before' + camelMethod], [], component);
          registry[method](component);
          callback(component['after' + camelMethod], [], component);
      }
   _getRegistryForType(type) {
          for(let i = 0; i < this._typedRegistries.length; i++){
              const reg = this._typedRegistries[i];
              if (reg.isForType(type)) {
                  return reg;
              }
          }
          return this.plugins;
      }
   _get(id, typedRegistry, type) {
          const item = typedRegistry.get(id);
          if (item === undefined) {
              throw new Error('"' + id + '" is not a registered ' + type + '.');
          }
          return item;
      }
  }
  var registry = /* #__PURE__ */ new Registry();

  class PluginService {
      constructor(){
          this._init = [];
      }
   notify(chart, hook, args, filter) {
          if (hook === 'beforeInit') {
              this._init = this._createDescriptors(chart, true);
              this._notify(this._init, chart, 'install');
          }
          const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
          const result = this._notify(descriptors, chart, hook, args);
          if (hook === 'afterDestroy') {
              this._notify(descriptors, chart, 'stop');
              this._notify(this._init, chart, 'uninstall');
          }
          return result;
      }
   _notify(descriptors, chart, hook, args) {
          args = args || {};
          for (const descriptor of descriptors){
              const plugin = descriptor.plugin;
              const method = plugin[hook];
              const params = [
                  chart,
                  args,
                  descriptor.options
              ];
              if (callback(method, params, plugin) === false && args.cancelable) {
                  return false;
              }
          }
          return true;
      }
      invalidate() {
          if (!isNullOrUndef(this._cache)) {
              this._oldCache = this._cache;
              this._cache = undefined;
          }
      }
   _descriptors(chart) {
          if (this._cache) {
              return this._cache;
          }
          const descriptors = this._cache = this._createDescriptors(chart);
          this._notifyStateChanges(chart);
          return descriptors;
      }
      _createDescriptors(chart, all) {
          const config = chart && chart.config;
          const options = valueOrDefault(config.options && config.options.plugins, {});
          const plugins = allPlugins(config);
          return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
      }
   _notifyStateChanges(chart) {
          const previousDescriptors = this._oldCache || [];
          const descriptors = this._cache;
          const diff = (a, b)=>a.filter((x)=>!b.some((y)=>x.plugin.id === y.plugin.id));
          this._notify(diff(previousDescriptors, descriptors), chart, 'stop');
          this._notify(diff(descriptors, previousDescriptors), chart, 'start');
      }
  }
   function allPlugins(config) {
      const localIds = {};
      const plugins = [];
      const keys = Object.keys(registry.plugins.items);
      for(let i = 0; i < keys.length; i++){
          plugins.push(registry.getPlugin(keys[i]));
      }
      const local = config.plugins || [];
      for(let i = 0; i < local.length; i++){
          const plugin = local[i];
          if (plugins.indexOf(plugin) === -1) {
              plugins.push(plugin);
              localIds[plugin.id] = true;
          }
      }
      return {
          plugins,
          localIds
      };
  }
  function getOpts(options, all) {
      if (!all && options === false) {
          return null;
      }
      if (options === true) {
          return {};
      }
      return options;
  }
  function createDescriptors(chart, { plugins , localIds  }, options, all) {
      const result = [];
      const context = chart.getContext();
      for (const plugin of plugins){
          const id = plugin.id;
          const opts = getOpts(options[id], all);
          if (opts === null) {
              continue;
          }
          result.push({
              plugin,
              options: pluginOpts(chart.config, {
                  plugin,
                  local: localIds[id]
              }, opts, context)
          });
      }
      return result;
  }
  function pluginOpts(config, { plugin , local  }, opts, context) {
      const keys = config.pluginScopeKeys(plugin);
      const scopes = config.getOptionScopes(opts, keys);
      if (local && plugin.defaults) {
          scopes.push(plugin.defaults);
      }
      return config.createResolver(scopes, context, [
          ''
      ], {
          scriptable: false,
          indexable: false,
          allKeys: true
      });
  }

  function getIndexAxis(type, options) {
      const datasetDefaults = defaults.datasets[type] || {};
      const datasetOptions = (options.datasets || {})[type] || {};
      return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || 'x';
  }
  function getAxisFromDefaultScaleID(id, indexAxis) {
      let axis = id;
      if (id === '_index_') {
          axis = indexAxis;
      } else if (id === '_value_') {
          axis = indexAxis === 'x' ? 'y' : 'x';
      }
      return axis;
  }
  function getDefaultScaleIDFromAxis(axis, indexAxis) {
      return axis === indexAxis ? '_index_' : '_value_';
  }
  function idMatchesAxis(id) {
      if (id === 'x' || id === 'y' || id === 'r') {
          return id;
      }
  }
  function axisFromPosition(position) {
      if (position === 'top' || position === 'bottom') {
          return 'x';
      }
      if (position === 'left' || position === 'right') {
          return 'y';
      }
  }
  function determineAxis(id, ...scaleOptions) {
      if (idMatchesAxis(id)) {
          return id;
      }
      for (const opts of scaleOptions){
          const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
          if (axis) {
              return axis;
          }
      }
      throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
  }
  function getAxisFromDataset(id, axis, dataset) {
      if (dataset[axis + 'AxisID'] === id) {
          return {
              axis
          };
      }
  }
  function retrieveAxisFromDatasets(id, config) {
      if (config.data && config.data.datasets) {
          const boundDs = config.data.datasets.filter((d)=>d.xAxisID === id || d.yAxisID === id);
          if (boundDs.length) {
              return getAxisFromDataset(id, 'x', boundDs[0]) || getAxisFromDataset(id, 'y', boundDs[0]);
          }
      }
      return {};
  }
  function mergeScaleConfig(config, options) {
      const chartDefaults = overrides[config.type] || {
          scales: {}
      };
      const configScales = options.scales || {};
      const chartIndexAxis = getIndexAxis(config.type, options);
      const scales = Object.create(null);
      Object.keys(configScales).forEach((id)=>{
          const scaleConf = configScales[id];
          if (!isObject(scaleConf)) {
              return console.error(`Invalid scale configuration for scale: ${id}`);
          }
          if (scaleConf._proxy) {
              return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
          }
          const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
          const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
          const defaultScaleOptions = chartDefaults.scales || {};
          scales[id] = mergeIf(Object.create(null), [
              {
                  axis
              },
              scaleConf,
              defaultScaleOptions[axis],
              defaultScaleOptions[defaultId]
          ]);
      });
      config.data.datasets.forEach((dataset)=>{
          const type = dataset.type || config.type;
          const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
          const datasetDefaults = overrides[type] || {};
          const defaultScaleOptions = datasetDefaults.scales || {};
          Object.keys(defaultScaleOptions).forEach((defaultID)=>{
              const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
              const id = dataset[axis + 'AxisID'] || axis;
              scales[id] = scales[id] || Object.create(null);
              mergeIf(scales[id], [
                  {
                      axis
                  },
                  configScales[id],
                  defaultScaleOptions[defaultID]
              ]);
          });
      });
      Object.keys(scales).forEach((key)=>{
          const scale = scales[key];
          mergeIf(scale, [
              defaults.scales[scale.type],
              defaults.scale
          ]);
      });
      return scales;
  }
  function initOptions(config) {
      const options = config.options || (config.options = {});
      options.plugins = valueOrDefault(options.plugins, {});
      options.scales = mergeScaleConfig(config, options);
  }
  function initData(data) {
      data = data || {};
      data.datasets = data.datasets || [];
      data.labels = data.labels || [];
      return data;
  }
  function initConfig(config) {
      config = config || {};
      config.data = initData(config.data);
      initOptions(config);
      return config;
  }
  const keyCache = new Map();
  const keysCached = new Set();
  function cachedKeys(cacheKey, generate) {
      let keys = keyCache.get(cacheKey);
      if (!keys) {
          keys = generate();
          keyCache.set(cacheKey, keys);
          keysCached.add(keys);
      }
      return keys;
  }
  const addIfFound = (set, obj, key)=>{
      const opts = resolveObjectKey(obj, key);
      if (opts !== undefined) {
          set.add(opts);
      }
  };
  class Config {
      constructor(config){
          this._config = initConfig(config);
          this._scopeCache = new Map();
          this._resolverCache = new Map();
      }
      get platform() {
          return this._config.platform;
      }
      get type() {
          return this._config.type;
      }
      set type(type) {
          this._config.type = type;
      }
      get data() {
          return this._config.data;
      }
      set data(data) {
          this._config.data = initData(data);
      }
      get options() {
          return this._config.options;
      }
      set options(options) {
          this._config.options = options;
      }
      get plugins() {
          return this._config.plugins;
      }
      update() {
          const config = this._config;
          this.clearCache();
          initOptions(config);
      }
      clearCache() {
          this._scopeCache.clear();
          this._resolverCache.clear();
      }
   datasetScopeKeys(datasetType) {
          return cachedKeys(datasetType, ()=>[
                  [
                      `datasets.${datasetType}`,
                      ''
                  ]
              ]);
      }
   datasetAnimationScopeKeys(datasetType, transition) {
          return cachedKeys(`${datasetType}.transition.${transition}`, ()=>[
                  [
                      `datasets.${datasetType}.transitions.${transition}`,
                      `transitions.${transition}`
                  ],
                  [
                      `datasets.${datasetType}`,
                      ''
                  ]
              ]);
      }
   datasetElementScopeKeys(datasetType, elementType) {
          return cachedKeys(`${datasetType}-${elementType}`, ()=>[
                  [
                      `datasets.${datasetType}.elements.${elementType}`,
                      `datasets.${datasetType}`,
                      `elements.${elementType}`,
                      ''
                  ]
              ]);
      }
   pluginScopeKeys(plugin) {
          const id = plugin.id;
          const type = this.type;
          return cachedKeys(`${type}-plugin-${id}`, ()=>[
                  [
                      `plugins.${id}`,
                      ...plugin.additionalOptionScopes || []
                  ]
              ]);
      }
   _cachedScopes(mainScope, resetCache) {
          const _scopeCache = this._scopeCache;
          let cache = _scopeCache.get(mainScope);
          if (!cache || resetCache) {
              cache = new Map();
              _scopeCache.set(mainScope, cache);
          }
          return cache;
      }
   getOptionScopes(mainScope, keyLists, resetCache) {
          const { options , type  } = this;
          const cache = this._cachedScopes(mainScope, resetCache);
          const cached = cache.get(keyLists);
          if (cached) {
              return cached;
          }
          const scopes = new Set();
          keyLists.forEach((keys)=>{
              if (mainScope) {
                  scopes.add(mainScope);
                  keys.forEach((key)=>addIfFound(scopes, mainScope, key));
              }
              keys.forEach((key)=>addIfFound(scopes, options, key));
              keys.forEach((key)=>addIfFound(scopes, overrides[type] || {}, key));
              keys.forEach((key)=>addIfFound(scopes, defaults, key));
              keys.forEach((key)=>addIfFound(scopes, descriptors, key));
          });
          const array = Array.from(scopes);
          if (array.length === 0) {
              array.push(Object.create(null));
          }
          if (keysCached.has(keyLists)) {
              cache.set(keyLists, array);
          }
          return array;
      }
   chartOptionScopes() {
          const { options , type  } = this;
          return [
              options,
              overrides[type] || {},
              defaults.datasets[type] || {},
              {
                  type
              },
              defaults,
              descriptors
          ];
      }
   resolveNamedOptions(scopes, names, context, prefixes = [
          ''
      ]) {
          const result = {
              $shared: true
          };
          const { resolver , subPrefixes  } = getResolver(this._resolverCache, scopes, prefixes);
          let options = resolver;
          if (needContext(resolver, names)) {
              result.$shared = false;
              context = isFunction(context) ? context() : context;
              const subResolver = this.createResolver(scopes, context, subPrefixes);
              options = _attachContext(resolver, context, subResolver);
          }
          for (const prop of names){
              result[prop] = options[prop];
          }
          return result;
      }
   createResolver(scopes, context, prefixes = [
          ''
      ], descriptorDefaults) {
          const { resolver  } = getResolver(this._resolverCache, scopes, prefixes);
          return isObject(context) ? _attachContext(resolver, context, undefined, descriptorDefaults) : resolver;
      }
  }
  function getResolver(resolverCache, scopes, prefixes) {
      let cache = resolverCache.get(scopes);
      if (!cache) {
          cache = new Map();
          resolverCache.set(scopes, cache);
      }
      const cacheKey = prefixes.join();
      let cached = cache.get(cacheKey);
      if (!cached) {
          const resolver = _createResolver(scopes, prefixes);
          cached = {
              resolver,
              subPrefixes: prefixes.filter((p)=>!p.toLowerCase().includes('hover'))
          };
          cache.set(cacheKey, cached);
      }
      return cached;
  }
  const hasFunction = (value)=>isObject(value) && Object.getOwnPropertyNames(value).some((key)=>isFunction(value[key]));
  function needContext(proxy, names) {
      const { isScriptable , isIndexable  } = _descriptors(proxy);
      for (const prop of names){
          const scriptable = isScriptable(prop);
          const indexable = isIndexable(prop);
          const value = (indexable || scriptable) && proxy[prop];
          if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
              return true;
          }
      }
      return false;
  }

  var version = "4.4.9";

  const KNOWN_POSITIONS = [
      'top',
      'bottom',
      'left',
      'right',
      'chartArea'
  ];
  function positionIsHorizontal(position, axis) {
      return position === 'top' || position === 'bottom' || KNOWN_POSITIONS.indexOf(position) === -1 && axis === 'x';
  }
  function compare2Level(l1, l2) {
      return function(a, b) {
          return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
      };
  }
  function onAnimationsComplete(context) {
      const chart = context.chart;
      const animationOptions = chart.options.animation;
      chart.notifyPlugins('afterRender');
      callback(animationOptions && animationOptions.onComplete, [
          context
      ], chart);
  }
  function onAnimationProgress(context) {
      const chart = context.chart;
      const animationOptions = chart.options.animation;
      callback(animationOptions && animationOptions.onProgress, [
          context
      ], chart);
  }
   function getCanvas(item) {
      if (_isDomSupported() && typeof item === 'string') {
          item = document.getElementById(item);
      } else if (item && item.length) {
          item = item[0];
      }
      if (item && item.canvas) {
          item = item.canvas;
      }
      return item;
  }
  const instances = {};
  const getChart = (key)=>{
      const canvas = getCanvas(key);
      return Object.values(instances).filter((c)=>c.canvas === canvas).pop();
  };
  function moveNumericKeys(obj, start, move) {
      const keys = Object.keys(obj);
      for (const key of keys){
          const intKey = +key;
          if (intKey >= start) {
              const value = obj[key];
              delete obj[key];
              if (move > 0 || intKey > start) {
                  obj[intKey + move] = value;
              }
          }
      }
  }
   function determineLastEvent(e, lastEvent, inChartArea, isClick) {
      if (!inChartArea || e.type === 'mouseout') {
          return null;
      }
      if (isClick) {
          return lastEvent;
      }
      return e;
  }
  class Chart {
      static defaults = defaults;
      static instances = instances;
      static overrides = overrides;
      static registry = registry;
      static version = version;
      static getChart = getChart;
      static register(...items) {
          registry.add(...items);
          invalidatePlugins();
      }
      static unregister(...items) {
          registry.remove(...items);
          invalidatePlugins();
      }
      constructor(item, userConfig){
          const config = this.config = new Config(userConfig);
          const initialCanvas = getCanvas(item);
          const existingChart = getChart(initialCanvas);
          if (existingChart) {
              throw new Error('Canvas is already in use. Chart with ID \'' + existingChart.id + '\'' + ' must be destroyed before the canvas with ID \'' + existingChart.canvas.id + '\' can be reused.');
          }
          const options = config.createResolver(config.chartOptionScopes(), this.getContext());
          this.platform = new (config.platform || _detectPlatform(initialCanvas))();
          this.platform.updateConfig(config);
          const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
          const canvas = context && context.canvas;
          const height = canvas && canvas.height;
          const width = canvas && canvas.width;
          this.id = uid();
          this.ctx = context;
          this.canvas = canvas;
          this.width = width;
          this.height = height;
          this._options = options;
          this._aspectRatio = this.aspectRatio;
          this._layers = [];
          this._metasets = [];
          this._stacks = undefined;
          this.boxes = [];
          this.currentDevicePixelRatio = undefined;
          this.chartArea = undefined;
          this._active = [];
          this._lastEvent = undefined;
          this._listeners = {};
           this._responsiveListeners = undefined;
          this._sortedMetasets = [];
          this.scales = {};
          this._plugins = new PluginService();
          this.$proxies = {};
          this._hiddenIndices = {};
          this.attached = false;
          this._animationsDisabled = undefined;
          this.$context = undefined;
          this._doResize = debounce((mode)=>this.update(mode), options.resizeDelay || 0);
          this._dataChanges = [];
          instances[this.id] = this;
          if (!context || !canvas) {
              console.error("Failed to create chart: can't acquire context from the given item");
              return;
          }
          animator.listen(this, 'complete', onAnimationsComplete);
          animator.listen(this, 'progress', onAnimationProgress);
          this._initialize();
          if (this.attached) {
              this.update();
          }
      }
      get aspectRatio() {
          const { options: { aspectRatio , maintainAspectRatio  } , width , height , _aspectRatio  } = this;
          if (!isNullOrUndef(aspectRatio)) {
              return aspectRatio;
          }
          if (maintainAspectRatio && _aspectRatio) {
              return _aspectRatio;
          }
          return height ? width / height : null;
      }
      get data() {
          return this.config.data;
      }
      set data(data) {
          this.config.data = data;
      }
      get options() {
          return this._options;
      }
      set options(options) {
          this.config.options = options;
      }
      get registry() {
          return registry;
      }
   _initialize() {
          this.notifyPlugins('beforeInit');
          if (this.options.responsive) {
              this.resize();
          } else {
              retinaScale(this, this.options.devicePixelRatio);
          }
          this.bindEvents();
          this.notifyPlugins('afterInit');
          return this;
      }
      clear() {
          clearCanvas(this.canvas, this.ctx);
          return this;
      }
      stop() {
          animator.stop(this);
          return this;
      }
   resize(width, height) {
          if (!animator.running(this)) {
              this._resize(width, height);
          } else {
              this._resizeBeforeDraw = {
                  width,
                  height
              };
          }
      }
      _resize(width, height) {
          const options = this.options;
          const canvas = this.canvas;
          const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
          const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
          const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
          const mode = this.width ? 'resize' : 'attach';
          this.width = newSize.width;
          this.height = newSize.height;
          this._aspectRatio = this.aspectRatio;
          if (!retinaScale(this, newRatio, true)) {
              return;
          }
          this.notifyPlugins('resize', {
              size: newSize
          });
          callback(options.onResize, [
              this,
              newSize
          ], this);
          if (this.attached) {
              if (this._doResize(mode)) {
                  this.render();
              }
          }
      }
      ensureScalesHaveIDs() {
          const options = this.options;
          const scalesOptions = options.scales || {};
          each(scalesOptions, (axisOptions, axisID)=>{
              axisOptions.id = axisID;
          });
      }
   buildOrUpdateScales() {
          const options = this.options;
          const scaleOpts = options.scales;
          const scales = this.scales;
          const updated = Object.keys(scales).reduce((obj, id)=>{
              obj[id] = false;
              return obj;
          }, {});
          let items = [];
          if (scaleOpts) {
              items = items.concat(Object.keys(scaleOpts).map((id)=>{
                  const scaleOptions = scaleOpts[id];
                  const axis = determineAxis(id, scaleOptions);
                  const isRadial = axis === 'r';
                  const isHorizontal = axis === 'x';
                  return {
                      options: scaleOptions,
                      dposition: isRadial ? 'chartArea' : isHorizontal ? 'bottom' : 'left',
                      dtype: isRadial ? 'radialLinear' : isHorizontal ? 'category' : 'linear'
                  };
              }));
          }
          each(items, (item)=>{
              const scaleOptions = item.options;
              const id = scaleOptions.id;
              const axis = determineAxis(id, scaleOptions);
              const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
              if (scaleOptions.position === undefined || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
                  scaleOptions.position = item.dposition;
              }
              updated[id] = true;
              let scale = null;
              if (id in scales && scales[id].type === scaleType) {
                  scale = scales[id];
              } else {
                  const scaleClass = registry.getScale(scaleType);
                  scale = new scaleClass({
                      id,
                      type: scaleType,
                      ctx: this.ctx,
                      chart: this
                  });
                  scales[scale.id] = scale;
              }
              scale.init(scaleOptions, options);
          });
          each(updated, (hasUpdated, id)=>{
              if (!hasUpdated) {
                  delete scales[id];
              }
          });
          each(scales, (scale)=>{
              layouts.configure(this, scale, scale.options);
              layouts.addBox(this, scale);
          });
      }
   _updateMetasets() {
          const metasets = this._metasets;
          const numData = this.data.datasets.length;
          const numMeta = metasets.length;
          metasets.sort((a, b)=>a.index - b.index);
          if (numMeta > numData) {
              for(let i = numData; i < numMeta; ++i){
                  this._destroyDatasetMeta(i);
              }
              metasets.splice(numData, numMeta - numData);
          }
          this._sortedMetasets = metasets.slice(0).sort(compare2Level('order', 'index'));
      }
   _removeUnreferencedMetasets() {
          const { _metasets: metasets , data: { datasets  }  } = this;
          if (metasets.length > datasets.length) {
              delete this._stacks;
          }
          metasets.forEach((meta, index)=>{
              if (datasets.filter((x)=>x === meta._dataset).length === 0) {
                  this._destroyDatasetMeta(index);
              }
          });
      }
      buildOrUpdateControllers() {
          const newControllers = [];
          const datasets = this.data.datasets;
          let i, ilen;
          this._removeUnreferencedMetasets();
          for(i = 0, ilen = datasets.length; i < ilen; i++){
              const dataset = datasets[i];
              let meta = this.getDatasetMeta(i);
              const type = dataset.type || this.config.type;
              if (meta.type && meta.type !== type) {
                  this._destroyDatasetMeta(i);
                  meta = this.getDatasetMeta(i);
              }
              meta.type = type;
              meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
              meta.order = dataset.order || 0;
              meta.index = i;
              meta.label = '' + dataset.label;
              meta.visible = this.isDatasetVisible(i);
              if (meta.controller) {
                  meta.controller.updateIndex(i);
                  meta.controller.linkScales();
              } else {
                  const ControllerClass = registry.getController(type);
                  const { datasetElementType , dataElementType  } = defaults.datasets[type];
                  Object.assign(ControllerClass, {
                      dataElementType: registry.getElement(dataElementType),
                      datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                  });
                  meta.controller = new ControllerClass(this, i);
                  newControllers.push(meta.controller);
              }
          }
          this._updateMetasets();
          return newControllers;
      }
   _resetElements() {
          each(this.data.datasets, (dataset, datasetIndex)=>{
              this.getDatasetMeta(datasetIndex).controller.reset();
          }, this);
      }
   reset() {
          this._resetElements();
          this.notifyPlugins('reset');
      }
      update(mode) {
          const config = this.config;
          config.update();
          const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
          const animsDisabled = this._animationsDisabled = !options.animation;
          this._updateScales();
          this._checkEventBindings();
          this._updateHiddenIndices();
          this._plugins.invalidate();
          if (this.notifyPlugins('beforeUpdate', {
              mode,
              cancelable: true
          }) === false) {
              return;
          }
          const newControllers = this.buildOrUpdateControllers();
          this.notifyPlugins('beforeElementsUpdate');
          let minPadding = 0;
          for(let i = 0, ilen = this.data.datasets.length; i < ilen; i++){
              const { controller  } = this.getDatasetMeta(i);
              const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
              controller.buildOrUpdateElements(reset);
              minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
          }
          minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
          this._updateLayout(minPadding);
          if (!animsDisabled) {
              each(newControllers, (controller)=>{
                  controller.reset();
              });
          }
          this._updateDatasets(mode);
          this.notifyPlugins('afterUpdate', {
              mode
          });
          this._layers.sort(compare2Level('z', '_idx'));
          const { _active , _lastEvent  } = this;
          if (_lastEvent) {
              this._eventHandler(_lastEvent, true);
          } else if (_active.length) {
              this._updateHoverStyles(_active, _active, true);
          }
          this.render();
      }
   _updateScales() {
          each(this.scales, (scale)=>{
              layouts.removeBox(this, scale);
          });
          this.ensureScalesHaveIDs();
          this.buildOrUpdateScales();
      }
   _checkEventBindings() {
          const options = this.options;
          const existingEvents = new Set(Object.keys(this._listeners));
          const newEvents = new Set(options.events);
          if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
              this.unbindEvents();
              this.bindEvents();
          }
      }
   _updateHiddenIndices() {
          const { _hiddenIndices  } = this;
          const changes = this._getUniformDataChanges() || [];
          for (const { method , start , count  } of changes){
              const move = method === '_removeElements' ? -count : count;
              moveNumericKeys(_hiddenIndices, start, move);
          }
      }
   _getUniformDataChanges() {
          const _dataChanges = this._dataChanges;
          if (!_dataChanges || !_dataChanges.length) {
              return;
          }
          this._dataChanges = [];
          const datasetCount = this.data.datasets.length;
          const makeSet = (idx)=>new Set(_dataChanges.filter((c)=>c[0] === idx).map((c, i)=>i + ',' + c.splice(1).join(',')));
          const changeSet = makeSet(0);
          for(let i = 1; i < datasetCount; i++){
              if (!setsEqual(changeSet, makeSet(i))) {
                  return;
              }
          }
          return Array.from(changeSet).map((c)=>c.split(',')).map((a)=>({
                  method: a[1],
                  start: +a[2],
                  count: +a[3]
              }));
      }
   _updateLayout(minPadding) {
          if (this.notifyPlugins('beforeLayout', {
              cancelable: true
          }) === false) {
              return;
          }
          layouts.update(this, this.width, this.height, minPadding);
          const area = this.chartArea;
          const noArea = area.width <= 0 || area.height <= 0;
          this._layers = [];
          each(this.boxes, (box)=>{
              if (noArea && box.position === 'chartArea') {
                  return;
              }
              if (box.configure) {
                  box.configure();
              }
              this._layers.push(...box._layers());
          }, this);
          this._layers.forEach((item, index)=>{
              item._idx = index;
          });
          this.notifyPlugins('afterLayout');
      }
   _updateDatasets(mode) {
          if (this.notifyPlugins('beforeDatasetsUpdate', {
              mode,
              cancelable: true
          }) === false) {
              return;
          }
          for(let i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
              this.getDatasetMeta(i).controller.configure();
          }
          for(let i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
              this._updateDataset(i, isFunction(mode) ? mode({
                  datasetIndex: i
              }) : mode);
          }
          this.notifyPlugins('afterDatasetsUpdate', {
              mode
          });
      }
   _updateDataset(index, mode) {
          const meta = this.getDatasetMeta(index);
          const args = {
              meta,
              index,
              mode,
              cancelable: true
          };
          if (this.notifyPlugins('beforeDatasetUpdate', args) === false) {
              return;
          }
          meta.controller._update(mode);
          args.cancelable = false;
          this.notifyPlugins('afterDatasetUpdate', args);
      }
      render() {
          if (this.notifyPlugins('beforeRender', {
              cancelable: true
          }) === false) {
              return;
          }
          if (animator.has(this)) {
              if (this.attached && !animator.running(this)) {
                  animator.start(this);
              }
          } else {
              this.draw();
              onAnimationsComplete({
                  chart: this
              });
          }
      }
      draw() {
          let i;
          if (this._resizeBeforeDraw) {
              const { width , height  } = this._resizeBeforeDraw;
              this._resizeBeforeDraw = null;
              this._resize(width, height);
          }
          this.clear();
          if (this.width <= 0 || this.height <= 0) {
              return;
          }
          if (this.notifyPlugins('beforeDraw', {
              cancelable: true
          }) === false) {
              return;
          }
          const layers = this._layers;
          for(i = 0; i < layers.length && layers[i].z <= 0; ++i){
              layers[i].draw(this.chartArea);
          }
          this._drawDatasets();
          for(; i < layers.length; ++i){
              layers[i].draw(this.chartArea);
          }
          this.notifyPlugins('afterDraw');
      }
   _getSortedDatasetMetas(filterVisible) {
          const metasets = this._sortedMetasets;
          const result = [];
          let i, ilen;
          for(i = 0, ilen = metasets.length; i < ilen; ++i){
              const meta = metasets[i];
              if (!filterVisible || meta.visible) {
                  result.push(meta);
              }
          }
          return result;
      }
   getSortedVisibleDatasetMetas() {
          return this._getSortedDatasetMetas(true);
      }
   _drawDatasets() {
          if (this.notifyPlugins('beforeDatasetsDraw', {
              cancelable: true
          }) === false) {
              return;
          }
          const metasets = this.getSortedVisibleDatasetMetas();
          for(let i = metasets.length - 1; i >= 0; --i){
              this._drawDataset(metasets[i]);
          }
          this.notifyPlugins('afterDatasetsDraw');
      }
   _drawDataset(meta) {
          const ctx = this.ctx;
          const args = {
              meta,
              index: meta.index,
              cancelable: true
          };
          const clip = getDatasetClipArea(this, meta);
          if (this.notifyPlugins('beforeDatasetDraw', args) === false) {
              return;
          }
          if (clip) {
              clipArea(ctx, clip);
          }
          meta.controller.draw();
          if (clip) {
              unclipArea(ctx);
          }
          args.cancelable = false;
          this.notifyPlugins('afterDatasetDraw', args);
      }
   isPointInArea(point) {
          return _isPointInArea(point, this.chartArea, this._minPadding);
      }
      getElementsAtEventForMode(e, mode, options, useFinalPosition) {
          const method = Interaction.modes[mode];
          if (typeof method === 'function') {
              return method(this, e, options, useFinalPosition);
          }
          return [];
      }
      getDatasetMeta(datasetIndex) {
          const dataset = this.data.datasets[datasetIndex];
          const metasets = this._metasets;
          let meta = metasets.filter((x)=>x && x._dataset === dataset).pop();
          if (!meta) {
              meta = {
                  type: null,
                  data: [],
                  dataset: null,
                  controller: null,
                  hidden: null,
                  xAxisID: null,
                  yAxisID: null,
                  order: dataset && dataset.order || 0,
                  index: datasetIndex,
                  _dataset: dataset,
                  _parsed: [],
                  _sorted: false
              };
              metasets.push(meta);
          }
          return meta;
      }
      getContext() {
          return this.$context || (this.$context = createContext(null, {
              chart: this,
              type: 'chart'
          }));
      }
      getVisibleDatasetCount() {
          return this.getSortedVisibleDatasetMetas().length;
      }
      isDatasetVisible(datasetIndex) {
          const dataset = this.data.datasets[datasetIndex];
          if (!dataset) {
              return false;
          }
          const meta = this.getDatasetMeta(datasetIndex);
          return typeof meta.hidden === 'boolean' ? !meta.hidden : !dataset.hidden;
      }
      setDatasetVisibility(datasetIndex, visible) {
          const meta = this.getDatasetMeta(datasetIndex);
          meta.hidden = !visible;
      }
      toggleDataVisibility(index) {
          this._hiddenIndices[index] = !this._hiddenIndices[index];
      }
      getDataVisibility(index) {
          return !this._hiddenIndices[index];
      }
   _updateVisibility(datasetIndex, dataIndex, visible) {
          const mode = visible ? 'show' : 'hide';
          const meta = this.getDatasetMeta(datasetIndex);
          const anims = meta.controller._resolveAnimations(undefined, mode);
          if (defined(dataIndex)) {
              meta.data[dataIndex].hidden = !visible;
              this.update();
          } else {
              this.setDatasetVisibility(datasetIndex, visible);
              anims.update(meta, {
                  visible
              });
              this.update((ctx)=>ctx.datasetIndex === datasetIndex ? mode : undefined);
          }
      }
      hide(datasetIndex, dataIndex) {
          this._updateVisibility(datasetIndex, dataIndex, false);
      }
      show(datasetIndex, dataIndex) {
          this._updateVisibility(datasetIndex, dataIndex, true);
      }
   _destroyDatasetMeta(datasetIndex) {
          const meta = this._metasets[datasetIndex];
          if (meta && meta.controller) {
              meta.controller._destroy();
          }
          delete this._metasets[datasetIndex];
      }
      _stop() {
          let i, ilen;
          this.stop();
          animator.remove(this);
          for(i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
              this._destroyDatasetMeta(i);
          }
      }
      destroy() {
          this.notifyPlugins('beforeDestroy');
          const { canvas , ctx  } = this;
          this._stop();
          this.config.clearCache();
          if (canvas) {
              this.unbindEvents();
              clearCanvas(canvas, ctx);
              this.platform.releaseContext(ctx);
              this.canvas = null;
              this.ctx = null;
          }
          delete instances[this.id];
          this.notifyPlugins('afterDestroy');
      }
      toBase64Image(...args) {
          return this.canvas.toDataURL(...args);
      }
   bindEvents() {
          this.bindUserEvents();
          if (this.options.responsive) {
              this.bindResponsiveEvents();
          } else {
              this.attached = true;
          }
      }
   bindUserEvents() {
          const listeners = this._listeners;
          const platform = this.platform;
          const _add = (type, listener)=>{
              platform.addEventListener(this, type, listener);
              listeners[type] = listener;
          };
          const listener = (e, x, y)=>{
              e.offsetX = x;
              e.offsetY = y;
              this._eventHandler(e);
          };
          each(this.options.events, (type)=>_add(type, listener));
      }
   bindResponsiveEvents() {
          if (!this._responsiveListeners) {
              this._responsiveListeners = {};
          }
          const listeners = this._responsiveListeners;
          const platform = this.platform;
          const _add = (type, listener)=>{
              platform.addEventListener(this, type, listener);
              listeners[type] = listener;
          };
          const _remove = (type, listener)=>{
              if (listeners[type]) {
                  platform.removeEventListener(this, type, listener);
                  delete listeners[type];
              }
          };
          const listener = (width, height)=>{
              if (this.canvas) {
                  this.resize(width, height);
              }
          };
          let detached;
          const attached = ()=>{
              _remove('attach', attached);
              this.attached = true;
              this.resize();
              _add('resize', listener);
              _add('detach', detached);
          };
          detached = ()=>{
              this.attached = false;
              _remove('resize', listener);
              this._stop();
              this._resize(0, 0);
              _add('attach', attached);
          };
          if (platform.isAttached(this.canvas)) {
              attached();
          } else {
              detached();
          }
      }
   unbindEvents() {
          each(this._listeners, (listener, type)=>{
              this.platform.removeEventListener(this, type, listener);
          });
          this._listeners = {};
          each(this._responsiveListeners, (listener, type)=>{
              this.platform.removeEventListener(this, type, listener);
          });
          this._responsiveListeners = undefined;
      }
      updateHoverStyle(items, mode, enabled) {
          const prefix = enabled ? 'set' : 'remove';
          let meta, item, i, ilen;
          if (mode === 'dataset') {
              meta = this.getDatasetMeta(items[0].datasetIndex);
              meta.controller['_' + prefix + 'DatasetHoverStyle']();
          }
          for(i = 0, ilen = items.length; i < ilen; ++i){
              item = items[i];
              const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
              if (controller) {
                  controller[prefix + 'HoverStyle'](item.element, item.datasetIndex, item.index);
              }
          }
      }
   getActiveElements() {
          return this._active || [];
      }
   setActiveElements(activeElements) {
          const lastActive = this._active || [];
          const active = activeElements.map(({ datasetIndex , index  })=>{
              const meta = this.getDatasetMeta(datasetIndex);
              if (!meta) {
                  throw new Error('No dataset found at index ' + datasetIndex);
              }
              return {
                  datasetIndex,
                  element: meta.data[index],
                  index
              };
          });
          const changed = !_elementsEqual(active, lastActive);
          if (changed) {
              this._active = active;
              this._lastEvent = null;
              this._updateHoverStyles(active, lastActive);
          }
      }
   notifyPlugins(hook, args, filter) {
          return this._plugins.notify(this, hook, args, filter);
      }
   isPluginEnabled(pluginId) {
          return this._plugins._cache.filter((p)=>p.plugin.id === pluginId).length === 1;
      }
   _updateHoverStyles(active, lastActive, replay) {
          const hoverOptions = this.options.hover;
          const diff = (a, b)=>a.filter((x)=>!b.some((y)=>x.datasetIndex === y.datasetIndex && x.index === y.index));
          const deactivated = diff(lastActive, active);
          const activated = replay ? active : diff(active, lastActive);
          if (deactivated.length) {
              this.updateHoverStyle(deactivated, hoverOptions.mode, false);
          }
          if (activated.length && hoverOptions.mode) {
              this.updateHoverStyle(activated, hoverOptions.mode, true);
          }
      }
   _eventHandler(e, replay) {
          const args = {
              event: e,
              replay,
              cancelable: true,
              inChartArea: this.isPointInArea(e)
          };
          const eventFilter = (plugin)=>(plugin.options.events || this.options.events).includes(e.native.type);
          if (this.notifyPlugins('beforeEvent', args, eventFilter) === false) {
              return;
          }
          const changed = this._handleEvent(e, replay, args.inChartArea);
          args.cancelable = false;
          this.notifyPlugins('afterEvent', args, eventFilter);
          if (changed || args.changed) {
              this.render();
          }
          return this;
      }
   _handleEvent(e, replay, inChartArea) {
          const { _active: lastActive = [] , options  } = this;
          const useFinalPosition = replay;
          const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
          const isClick = _isClickEvent(e);
          const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
          if (inChartArea) {
              this._lastEvent = null;
              callback(options.onHover, [
                  e,
                  active,
                  this
              ], this);
              if (isClick) {
                  callback(options.onClick, [
                      e,
                      active,
                      this
                  ], this);
              }
          }
          const changed = !_elementsEqual(active, lastActive);
          if (changed || replay) {
              this._active = active;
              this._updateHoverStyles(active, lastActive, replay);
          }
          this._lastEvent = lastEvent;
          return changed;
      }
   _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
          if (e.type === 'mouseout') {
              return [];
          }
          if (!inChartArea) {
              return lastActive;
          }
          const hoverOptions = this.options.hover;
          return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
      }
  }
  function invalidatePlugins() {
      return each(Chart.instances, (chart)=>chart._plugins.invalidate());
  }

  function clipArc(ctx, element, endAngle) {
      const { startAngle , pixelMargin , x , y , outerRadius , innerRadius  } = element;
      let angleMargin = pixelMargin / outerRadius;
      // Draw an inner border by clipping the arc and drawing a double-width border
      // Enlarge the clipping arc by 0.33 pixels to eliminate glitches between borders
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
      if (innerRadius > pixelMargin) {
          angleMargin = pixelMargin / innerRadius;
          ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
      } else {
          ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
      }
      ctx.closePath();
      ctx.clip();
  }
  function toRadiusCorners(value) {
      return _readValueToProps(value, [
          'outerStart',
          'outerEnd',
          'innerStart',
          'innerEnd'
      ]);
  }
  /**
   * Parse border radius from the provided options
   */ function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
      const o = toRadiusCorners(arc.options.borderRadius);
      const halfThickness = (outerRadius - innerRadius) / 2;
      const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
      // Outer limits are complicated. We want to compute the available angular distance at
      // a radius of outerRadius - borderRadius because for small angular distances, this term limits.
      // We compute at r = outerRadius - borderRadius because this circle defines the center of the border corners.
      //
      // If the borderRadius is large, that value can become negative.
      // This causes the outer borders to lose their radius entirely, which is rather unexpected. To solve that, if borderRadius > outerRadius
      // we know that the thickness term will dominate and compute the limits at that point
      const computeOuterLimit = (val)=>{
          const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
          return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
      };
      return {
          outerStart: computeOuterLimit(o.outerStart),
          outerEnd: computeOuterLimit(o.outerEnd),
          innerStart: _limitValue(o.innerStart, 0, innerLimit),
          innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
      };
  }
  /**
   * Convert (r, 𝜃) to (x, y)
   */ function rThetaToXY(r, theta, x, y) {
      return {
          x: x + r * Math.cos(theta),
          y: y + r * Math.sin(theta)
      };
  }
  /**
   * Path the arc, respecting border radius by separating into left and right halves.
   *
   *   Start      End
   *
   *    1--->a--->2    Outer
   *   /           \
   *   8           3
   *   |           |
   *   |           |
   *   7           4
   *   \           /
   *    6<---b<---5    Inner
   */ function pathArc(ctx, element, offset, spacing, end, circular) {
      const { x , y , startAngle: start , pixelMargin , innerRadius: innerR  } = element;
      const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
      const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
      let spacingOffset = 0;
      const alpha = end - start;
      if (spacing) {
          // When spacing is present, it is the same for all items
          // So we adjust the start and end angle of the arc such that
          // the distance is the same as it would be without the spacing
          const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
          const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
          const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
          const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
          spacingOffset = (alpha - adjustedAngle) / 2;
      }
      const beta = Math.max(0.001, alpha * outerRadius - offset / PI) / outerRadius;
      const angleOffset = (alpha - beta) / 2;
      const startAngle = start + angleOffset + spacingOffset;
      const endAngle = end - angleOffset - spacingOffset;
      const { outerStart , outerEnd , innerStart , innerEnd  } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
      const outerStartAdjustedRadius = outerRadius - outerStart;
      const outerEndAdjustedRadius = outerRadius - outerEnd;
      const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
      const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
      const innerStartAdjustedRadius = innerRadius + innerStart;
      const innerEndAdjustedRadius = innerRadius + innerEnd;
      const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
      const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
      ctx.beginPath();
      if (circular) {
          // The first arc segments from point 1 to point a to point 2
          const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
          ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
          ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
          // The corner segment from point 2 to point 3
          if (outerEnd > 0) {
              const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
          }
          // The line from point 3 to point 4
          const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
          ctx.lineTo(p4.x, p4.y);
          // The corner segment from point 4 to point 5
          if (innerEnd > 0) {
              const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
          }
          // The inner arc from point 5 to point b to point 6
          const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
          ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
          ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
          // The corner segment from point 6 to point 7
          if (innerStart > 0) {
              const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
          }
          // The line from point 7 to point 8
          const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
          ctx.lineTo(p8.x, p8.y);
          // The corner segment from point 8 to point 1
          if (outerStart > 0) {
              const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
              ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
          }
      } else {
          ctx.moveTo(x, y);
          const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
          const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
          ctx.lineTo(outerStartX, outerStartY);
          const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
          const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
          ctx.lineTo(outerEndX, outerEndY);
      }
      ctx.closePath();
  }
  function drawArc(ctx, element, offset, spacing, circular) {
      const { fullCircles , startAngle , circumference  } = element;
      let endAngle = element.endAngle;
      if (fullCircles) {
          pathArc(ctx, element, offset, spacing, endAngle, circular);
          for(let i = 0; i < fullCircles; ++i){
              ctx.fill();
          }
          if (!isNaN(circumference)) {
              endAngle = startAngle + (circumference % TAU || TAU);
          }
      }
      pathArc(ctx, element, offset, spacing, endAngle, circular);
      ctx.fill();
      return endAngle;
  }
  function drawBorder(ctx, element, offset, spacing, circular) {
      const { fullCircles , startAngle , circumference , options  } = element;
      const { borderWidth , borderJoinStyle , borderDash , borderDashOffset  } = options;
      const inner = options.borderAlign === 'inner';
      if (!borderWidth) {
          return;
      }
      ctx.setLineDash(borderDash || []);
      ctx.lineDashOffset = borderDashOffset;
      if (inner) {
          ctx.lineWidth = borderWidth * 2;
          ctx.lineJoin = borderJoinStyle || 'round';
      } else {
          ctx.lineWidth = borderWidth;
          ctx.lineJoin = borderJoinStyle || 'bevel';
      }
      let endAngle = element.endAngle;
      if (fullCircles) {
          pathArc(ctx, element, offset, spacing, endAngle, circular);
          for(let i = 0; i < fullCircles; ++i){
              ctx.stroke();
          }
          if (!isNaN(circumference)) {
              endAngle = startAngle + (circumference % TAU || TAU);
          }
      }
      if (inner) {
          clipArc(ctx, element, endAngle);
      }
      if (!fullCircles) {
          pathArc(ctx, element, offset, spacing, endAngle, circular);
          ctx.stroke();
      }
  }
  class ArcElement extends Element {
      static id = 'arc';
      static defaults = {
          borderAlign: 'center',
          borderColor: '#fff',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: undefined,
          borderRadius: 0,
          borderWidth: 2,
          offset: 0,
          spacing: 0,
          angle: undefined,
          circular: true
      };
      static defaultRoutes = {
          backgroundColor: 'backgroundColor'
      };
      static descriptors = {
          _scriptable: true,
          _indexable: (name)=>name !== 'borderDash'
      };
      circumference;
      endAngle;
      fullCircles;
      innerRadius;
      outerRadius;
      pixelMargin;
      startAngle;
      constructor(cfg){
          super();
          this.options = undefined;
          this.circumference = undefined;
          this.startAngle = undefined;
          this.endAngle = undefined;
          this.innerRadius = undefined;
          this.outerRadius = undefined;
          this.pixelMargin = 0;
          this.fullCircles = 0;
          if (cfg) {
              Object.assign(this, cfg);
          }
      }
      inRange(chartX, chartY, useFinalPosition) {
          const point = this.getProps([
              'x',
              'y'
          ], useFinalPosition);
          const { angle , distance  } = getAngleFromPoint(point, {
              x: chartX,
              y: chartY
          });
          const { startAngle , endAngle , innerRadius , outerRadius , circumference  } = this.getProps([
              'startAngle',
              'endAngle',
              'innerRadius',
              'outerRadius',
              'circumference'
          ], useFinalPosition);
          const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
          const _circumference = valueOrDefault(circumference, endAngle - startAngle);
          const nonZeroBetween = _angleBetween(angle, startAngle, endAngle) && startAngle !== endAngle;
          const betweenAngles = _circumference >= TAU || nonZeroBetween;
          const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
          return betweenAngles && withinRadius;
      }
      getCenterPoint(useFinalPosition) {
          const { x , y , startAngle , endAngle , innerRadius , outerRadius  } = this.getProps([
              'x',
              'y',
              'startAngle',
              'endAngle',
              'innerRadius',
              'outerRadius'
          ], useFinalPosition);
          const { offset , spacing  } = this.options;
          const halfAngle = (startAngle + endAngle) / 2;
          const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
          return {
              x: x + Math.cos(halfAngle) * halfRadius,
              y: y + Math.sin(halfAngle) * halfRadius
          };
      }
      tooltipPosition(useFinalPosition) {
          return this.getCenterPoint(useFinalPosition);
      }
      draw(ctx) {
          const { options , circumference  } = this;
          const offset = (options.offset || 0) / 4;
          const spacing = (options.spacing || 0) / 2;
          const circular = options.circular;
          this.pixelMargin = options.borderAlign === 'inner' ? 0.33 : 0;
          this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
          if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
              return;
          }
          ctx.save();
          const halfAngle = (this.startAngle + this.endAngle) / 2;
          ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
          const fix = 1 - Math.sin(Math.min(PI, circumference || 0));
          const radiusOffset = offset * fix;
          ctx.fillStyle = options.backgroundColor;
          ctx.strokeStyle = options.borderColor;
          drawArc(ctx, this, radiusOffset, spacing, circular);
          drawBorder(ctx, this, radiusOffset, spacing, circular);
          ctx.restore();
      }
  }

  function setStyle(ctx, options, style = options) {
      ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
      ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
      ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
      ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
      ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
      ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
  }
  function lineTo(ctx, previous, target) {
      ctx.lineTo(target.x, target.y);
  }
   function getLineMethod(options) {
      if (options.stepped) {
          return _steppedLineTo;
      }
      if (options.tension || options.cubicInterpolationMode === 'monotone') {
          return _bezierCurveTo;
      }
      return lineTo;
  }
  function pathVars(points, segment, params = {}) {
      const count = points.length;
      const { start: paramsStart = 0 , end: paramsEnd = count - 1  } = params;
      const { start: segmentStart , end: segmentEnd  } = segment;
      const start = Math.max(paramsStart, segmentStart);
      const end = Math.min(paramsEnd, segmentEnd);
      const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
      return {
          count,
          start,
          loop: segment.loop,
          ilen: end < start && !outside ? count + end - start : end - start
      };
  }
   function pathSegment(ctx, line, segment, params) {
      const { points , options  } = line;
      const { count , start , loop , ilen  } = pathVars(points, segment, params);
      const lineMethod = getLineMethod(options);
      let { move =true , reverse  } = params || {};
      let i, point, prev;
      for(i = 0; i <= ilen; ++i){
          point = points[(start + (reverse ? ilen - i : i)) % count];
          if (point.skip) {
              continue;
          } else if (move) {
              ctx.moveTo(point.x, point.y);
              move = false;
          } else {
              lineMethod(ctx, prev, point, reverse, options.stepped);
          }
          prev = point;
      }
      if (loop) {
          point = points[(start + (reverse ? ilen : 0)) % count];
          lineMethod(ctx, prev, point, reverse, options.stepped);
      }
      return !!loop;
  }
   function fastPathSegment(ctx, line, segment, params) {
      const points = line.points;
      const { count , start , ilen  } = pathVars(points, segment, params);
      const { move =true , reverse  } = params || {};
      let avgX = 0;
      let countX = 0;
      let i, point, prevX, minY, maxY, lastY;
      const pointIndex = (index)=>(start + (reverse ? ilen - index : index)) % count;
      const drawX = ()=>{
          if (minY !== maxY) {
              ctx.lineTo(avgX, maxY);
              ctx.lineTo(avgX, minY);
              ctx.lineTo(avgX, lastY);
          }
      };
      if (move) {
          point = points[pointIndex(0)];
          ctx.moveTo(point.x, point.y);
      }
      for(i = 0; i <= ilen; ++i){
          point = points[pointIndex(i)];
          if (point.skip) {
              continue;
          }
          const x = point.x;
          const y = point.y;
          const truncX = x | 0;
          if (truncX === prevX) {
              if (y < minY) {
                  minY = y;
              } else if (y > maxY) {
                  maxY = y;
              }
              avgX = (countX * avgX + x) / ++countX;
          } else {
              drawX();
              ctx.lineTo(x, y);
              prevX = truncX;
              countX = 0;
              minY = maxY = y;
          }
          lastY = y;
      }
      drawX();
  }
   function _getSegmentMethod(line) {
      const opts = line.options;
      const borderDash = opts.borderDash && opts.borderDash.length;
      const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== 'monotone' && !opts.stepped && !borderDash;
      return useFastPath ? fastPathSegment : pathSegment;
  }
   function _getInterpolationMethod(options) {
      if (options.stepped) {
          return _steppedInterpolation;
      }
      if (options.tension || options.cubicInterpolationMode === 'monotone') {
          return _bezierInterpolation;
      }
      return _pointInLine;
  }
  function strokePathWithCache(ctx, line, start, count) {
      let path = line._path;
      if (!path) {
          path = line._path = new Path2D();
          if (line.path(path, start, count)) {
              path.closePath();
          }
      }
      setStyle(ctx, line.options);
      ctx.stroke(path);
  }
  function strokePathDirect(ctx, line, start, count) {
      const { segments , options  } = line;
      const segmentMethod = _getSegmentMethod(line);
      for (const segment of segments){
          setStyle(ctx, options, segment.style);
          ctx.beginPath();
          if (segmentMethod(ctx, line, segment, {
              start,
              end: start + count - 1
          })) {
              ctx.closePath();
          }
          ctx.stroke();
      }
  }
  const usePath2D = typeof Path2D === 'function';
  function draw(ctx, line, start, count) {
      if (usePath2D && !line.options.segment) {
          strokePathWithCache(ctx, line, start, count);
      } else {
          strokePathDirect(ctx, line, start, count);
      }
  }
  class LineElement extends Element {
      static id = 'line';
   static defaults = {
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'miter',
          borderWidth: 3,
          capBezierPoints: true,
          cubicInterpolationMode: 'default',
          fill: false,
          spanGaps: false,
          stepped: false,
          tension: 0
      };
   static defaultRoutes = {
          backgroundColor: 'backgroundColor',
          borderColor: 'borderColor'
      };
      static descriptors = {
          _scriptable: true,
          _indexable: (name)=>name !== 'borderDash' && name !== 'fill'
      };
      constructor(cfg){
          super();
          this.animated = true;
          this.options = undefined;
          this._chart = undefined;
          this._loop = undefined;
          this._fullLoop = undefined;
          this._path = undefined;
          this._points = undefined;
          this._segments = undefined;
          this._decimated = false;
          this._pointsUpdated = false;
          this._datasetIndex = undefined;
          if (cfg) {
              Object.assign(this, cfg);
          }
      }
      updateControlPoints(chartArea, indexAxis) {
          const options = this.options;
          if ((options.tension || options.cubicInterpolationMode === 'monotone') && !options.stepped && !this._pointsUpdated) {
              const loop = options.spanGaps ? this._loop : this._fullLoop;
              _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
              this._pointsUpdated = true;
          }
      }
      set points(points) {
          this._points = points;
          delete this._segments;
          delete this._path;
          this._pointsUpdated = false;
      }
      get points() {
          return this._points;
      }
      get segments() {
          return this._segments || (this._segments = _computeSegments(this, this.options.segment));
      }
   first() {
          const segments = this.segments;
          const points = this.points;
          return segments.length && points[segments[0].start];
      }
   last() {
          const segments = this.segments;
          const points = this.points;
          const count = segments.length;
          return count && points[segments[count - 1].end];
      }
   interpolate(point, property) {
          const options = this.options;
          const value = point[property];
          const points = this.points;
          const segments = _boundSegments(this, {
              property,
              start: value,
              end: value
          });
          if (!segments.length) {
              return;
          }
          const result = [];
          const _interpolate = _getInterpolationMethod(options);
          let i, ilen;
          for(i = 0, ilen = segments.length; i < ilen; ++i){
              const { start , end  } = segments[i];
              const p1 = points[start];
              const p2 = points[end];
              if (p1 === p2) {
                  result.push(p1);
                  continue;
              }
              const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
              const interpolated = _interpolate(p1, p2, t, options.stepped);
              interpolated[property] = point[property];
              result.push(interpolated);
          }
          return result.length === 1 ? result[0] : result;
      }
   pathSegment(ctx, segment, params) {
          const segmentMethod = _getSegmentMethod(this);
          return segmentMethod(ctx, this, segment, params);
      }
   path(ctx, start, count) {
          const segments = this.segments;
          const segmentMethod = _getSegmentMethod(this);
          let loop = this._loop;
          start = start || 0;
          count = count || this.points.length - start;
          for (const segment of segments){
              loop &= segmentMethod(ctx, this, segment, {
                  start,
                  end: start + count - 1
              });
          }
          return !!loop;
      }
   draw(ctx, chartArea, start, count) {
          const options = this.options || {};
          const points = this.points || [];
          if (points.length && options.borderWidth) {
              ctx.save();
              draw(ctx, this, start, count);
              ctx.restore();
          }
          if (this.animated) {
              this._pointsUpdated = false;
              this._path = undefined;
          }
      }
  }

  function inRange$1(el, pos, axis, useFinalPosition) {
      const options = el.options;
      const { [axis]: value  } = el.getProps([
          axis
      ], useFinalPosition);
      return Math.abs(pos - value) < options.radius + options.hitRadius;
  }
  class PointElement extends Element {
      static id = 'point';
      parsed;
      skip;
      stop;
      /**
     * @type {any}
     */ static defaults = {
          borderWidth: 1,
          hitRadius: 1,
          hoverBorderWidth: 1,
          hoverRadius: 4,
          pointStyle: 'circle',
          radius: 3,
          rotation: 0
      };
      /**
     * @type {any}
     */ static defaultRoutes = {
          backgroundColor: 'backgroundColor',
          borderColor: 'borderColor'
      };
      constructor(cfg){
          super();
          this.options = undefined;
          this.parsed = undefined;
          this.skip = undefined;
          this.stop = undefined;
          if (cfg) {
              Object.assign(this, cfg);
          }
      }
      inRange(mouseX, mouseY, useFinalPosition) {
          const options = this.options;
          const { x , y  } = this.getProps([
              'x',
              'y'
          ], useFinalPosition);
          return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
      }
      inXRange(mouseX, useFinalPosition) {
          return inRange$1(this, mouseX, 'x', useFinalPosition);
      }
      inYRange(mouseY, useFinalPosition) {
          return inRange$1(this, mouseY, 'y', useFinalPosition);
      }
      getCenterPoint(useFinalPosition) {
          const { x , y  } = this.getProps([
              'x',
              'y'
          ], useFinalPosition);
          return {
              x,
              y
          };
      }
      size(options) {
          options = options || this.options || {};
          let radius = options.radius || 0;
          radius = Math.max(radius, radius && options.hoverRadius || 0);
          const borderWidth = radius && options.borderWidth || 0;
          return (radius + borderWidth) * 2;
      }
      draw(ctx, area) {
          const options = this.options;
          if (this.skip || options.radius < 0.1 || !_isPointInArea(this, area, this.size(options) / 2)) {
              return;
          }
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = options.borderWidth;
          ctx.fillStyle = options.backgroundColor;
          drawPoint(ctx, options, this.x, this.y);
      }
      getRange() {
          const options = this.options || {};
          // @ts-expect-error Fallbacks should never be hit in practice
          return options.radius + options.hitRadius;
      }
  }

  function getBarBounds(bar, useFinalPosition) {
      const { x , y , base , width , height  } =  bar.getProps([
          'x',
          'y',
          'base',
          'width',
          'height'
      ], useFinalPosition);
      let left, right, top, bottom, half;
      if (bar.horizontal) {
          half = height / 2;
          left = Math.min(x, base);
          right = Math.max(x, base);
          top = y - half;
          bottom = y + half;
      } else {
          half = width / 2;
          left = x - half;
          right = x + half;
          top = Math.min(y, base);
          bottom = Math.max(y, base);
      }
      return {
          left,
          top,
          right,
          bottom
      };
  }
  function skipOrLimit(skip, value, min, max) {
      return skip ? 0 : _limitValue(value, min, max);
  }
  function parseBorderWidth(bar, maxW, maxH) {
      const value = bar.options.borderWidth;
      const skip = bar.borderSkipped;
      const o = toTRBL(value);
      return {
          t: skipOrLimit(skip.top, o.top, 0, maxH),
          r: skipOrLimit(skip.right, o.right, 0, maxW),
          b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
          l: skipOrLimit(skip.left, o.left, 0, maxW)
      };
  }
  function parseBorderRadius(bar, maxW, maxH) {
      const { enableBorderRadius  } = bar.getProps([
          'enableBorderRadius'
      ]);
      const value = bar.options.borderRadius;
      const o = toTRBLCorners(value);
      const maxR = Math.min(maxW, maxH);
      const skip = bar.borderSkipped;
      const enableBorder = enableBorderRadius || isObject(value);
      return {
          topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
          topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
          bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
          bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
      };
  }
  function boundingRects(bar) {
      const bounds = getBarBounds(bar);
      const width = bounds.right - bounds.left;
      const height = bounds.bottom - bounds.top;
      const border = parseBorderWidth(bar, width / 2, height / 2);
      const radius = parseBorderRadius(bar, width / 2, height / 2);
      return {
          outer: {
              x: bounds.left,
              y: bounds.top,
              w: width,
              h: height,
              radius
          },
          inner: {
              x: bounds.left + border.l,
              y: bounds.top + border.t,
              w: width - border.l - border.r,
              h: height - border.t - border.b,
              radius: {
                  topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                  topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                  bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                  bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
              }
          }
      };
  }
  function inRange(bar, x, y, useFinalPosition) {
      const skipX = x === null;
      const skipY = y === null;
      const skipBoth = skipX && skipY;
      const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
      return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
  }
  function hasRadius(radius) {
      return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
  }
   function addNormalRectPath(ctx, rect) {
      ctx.rect(rect.x, rect.y, rect.w, rect.h);
  }
  function inflateRect(rect, amount, refRect = {}) {
      const x = rect.x !== refRect.x ? -amount : 0;
      const y = rect.y !== refRect.y ? -amount : 0;
      const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
      const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
      return {
          x: rect.x + x,
          y: rect.y + y,
          w: rect.w + w,
          h: rect.h + h,
          radius: rect.radius
      };
  }
  class BarElement extends Element {
      static id = 'bar';
   static defaults = {
          borderSkipped: 'start',
          borderWidth: 0,
          borderRadius: 0,
          inflateAmount: 'auto',
          pointStyle: undefined
      };
   static defaultRoutes = {
          backgroundColor: 'backgroundColor',
          borderColor: 'borderColor'
      };
      constructor(cfg){
          super();
          this.options = undefined;
          this.horizontal = undefined;
          this.base = undefined;
          this.width = undefined;
          this.height = undefined;
          this.inflateAmount = undefined;
          if (cfg) {
              Object.assign(this, cfg);
          }
      }
      draw(ctx) {
          const { inflateAmount , options: { borderColor , backgroundColor  }  } = this;
          const { inner , outer  } = boundingRects(this);
          const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
          ctx.save();
          if (outer.w !== inner.w || outer.h !== inner.h) {
              ctx.beginPath();
              addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
              ctx.clip();
              addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
              ctx.fillStyle = borderColor;
              ctx.fill('evenodd');
          }
          ctx.beginPath();
          addRectPath(ctx, inflateRect(inner, inflateAmount));
          ctx.fillStyle = backgroundColor;
          ctx.fill();
          ctx.restore();
      }
      inRange(mouseX, mouseY, useFinalPosition) {
          return inRange(this, mouseX, mouseY, useFinalPosition);
      }
      inXRange(mouseX, useFinalPosition) {
          return inRange(this, mouseX, null, useFinalPosition);
      }
      inYRange(mouseY, useFinalPosition) {
          return inRange(this, null, mouseY, useFinalPosition);
      }
      getCenterPoint(useFinalPosition) {
          const { x , y , base , horizontal  } =  this.getProps([
              'x',
              'y',
              'base',
              'horizontal'
          ], useFinalPosition);
          return {
              x: horizontal ? (x + base) / 2 : x,
              y: horizontal ? y : (y + base) / 2
          };
      }
      getRange(axis) {
          return axis === 'x' ? this.width / 2 : this.height / 2;
      }
  }

  var elements = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ArcElement: ArcElement,
  BarElement: BarElement,
  LineElement: LineElement,
  PointElement: PointElement
  });

  const BORDER_COLORS = [
      'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)' // grey
  ];
  // Border colors with 50% transparency
  const BACKGROUND_COLORS = /* #__PURE__ */ BORDER_COLORS.map((color)=>color.replace('rgb(', 'rgba(').replace(')', ', 0.5)'));
  function getBorderColor(i) {
      return BORDER_COLORS[i % BORDER_COLORS.length];
  }
  function getBackgroundColor(i) {
      return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
  }
  function colorizeDefaultDataset(dataset, i) {
      dataset.borderColor = getBorderColor(i);
      dataset.backgroundColor = getBackgroundColor(i);
      return ++i;
  }
  function colorizeDoughnutDataset(dataset, i) {
      dataset.backgroundColor = dataset.data.map(()=>getBorderColor(i++));
      return i;
  }
  function colorizePolarAreaDataset(dataset, i) {
      dataset.backgroundColor = dataset.data.map(()=>getBackgroundColor(i++));
      return i;
  }
  function getColorizer(chart) {
      let i = 0;
      return (dataset, datasetIndex)=>{
          const controller = chart.getDatasetMeta(datasetIndex).controller;
          if (controller instanceof DoughnutController) {
              i = colorizeDoughnutDataset(dataset, i);
          } else if (controller instanceof PolarAreaController) {
              i = colorizePolarAreaDataset(dataset, i);
          } else if (controller) {
              i = colorizeDefaultDataset(dataset, i);
          }
      };
  }
  function containsColorsDefinitions(descriptors) {
      let k;
      for(k in descriptors){
          if (descriptors[k].borderColor || descriptors[k].backgroundColor) {
              return true;
          }
      }
      return false;
  }
  function containsColorsDefinition(descriptor) {
      return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
  }
  function containsDefaultColorsDefenitions() {
      return defaults.borderColor !== 'rgba(0,0,0,0.1)' || defaults.backgroundColor !== 'rgba(0,0,0,0.1)';
  }
  var plugin_colors = {
      id: 'colors',
      defaults: {
          enabled: true,
          forceOverride: false
      },
      beforeLayout (chart, _args, options) {
          if (!options.enabled) {
              return;
          }
          const { data: { datasets  } , options: chartOptions  } = chart.config;
          const { elements  } = chartOptions;
          const containsColorDefenition = containsColorsDefinitions(datasets) || containsColorsDefinition(chartOptions) || elements && containsColorsDefinitions(elements) || containsDefaultColorsDefenitions();
          if (!options.forceOverride && containsColorDefenition) {
              return;
          }
          const colorizer = getColorizer(chart);
          datasets.forEach(colorizer);
      }
  };

  function lttbDecimation(data, start, count, availableWidth, options) {
   const samples = options.samples || availableWidth;
      if (samples >= count) {
          return data.slice(start, start + count);
      }
      const decimated = [];
      const bucketWidth = (count - 2) / (samples - 2);
      let sampledIndex = 0;
      const endIndex = start + count - 1;
      let a = start;
      let i, maxAreaPoint, maxArea, area, nextA;
      decimated[sampledIndex++] = data[a];
      for(i = 0; i < samples - 2; i++){
          let avgX = 0;
          let avgY = 0;
          let j;
          const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
          const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
          const avgRangeLength = avgRangeEnd - avgRangeStart;
          for(j = avgRangeStart; j < avgRangeEnd; j++){
              avgX += data[j].x;
              avgY += data[j].y;
          }
          avgX /= avgRangeLength;
          avgY /= avgRangeLength;
          const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
          const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
          const { x: pointAx , y: pointAy  } = data[a];
          maxArea = area = -1;
          for(j = rangeOffs; j < rangeTo; j++){
              area = 0.5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
              if (area > maxArea) {
                  maxArea = area;
                  maxAreaPoint = data[j];
                  nextA = j;
              }
          }
          decimated[sampledIndex++] = maxAreaPoint;
          a = nextA;
      }
      decimated[sampledIndex++] = data[endIndex];
      return decimated;
  }
  function minMaxDecimation(data, start, count, availableWidth) {
      let avgX = 0;
      let countX = 0;
      let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
      const decimated = [];
      const endIndex = start + count - 1;
      const xMin = data[start].x;
      const xMax = data[endIndex].x;
      const dx = xMax - xMin;
      for(i = start; i < start + count; ++i){
          point = data[i];
          x = (point.x - xMin) / dx * availableWidth;
          y = point.y;
          const truncX = x | 0;
          if (truncX === prevX) {
              if (y < minY) {
                  minY = y;
                  minIndex = i;
              } else if (y > maxY) {
                  maxY = y;
                  maxIndex = i;
              }
              avgX = (countX * avgX + point.x) / ++countX;
          } else {
              const lastIndex = i - 1;
              if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
                  const intermediateIndex1 = Math.min(minIndex, maxIndex);
                  const intermediateIndex2 = Math.max(minIndex, maxIndex);
                  if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
                      decimated.push({
                          ...data[intermediateIndex1],
                          x: avgX
                      });
                  }
                  if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
                      decimated.push({
                          ...data[intermediateIndex2],
                          x: avgX
                      });
                  }
              }
              if (i > 0 && lastIndex !== startIndex) {
                  decimated.push(data[lastIndex]);
              }
              decimated.push(point);
              prevX = truncX;
              countX = 0;
              minY = maxY = y;
              minIndex = maxIndex = startIndex = i;
          }
      }
      return decimated;
  }
  function cleanDecimatedDataset(dataset) {
      if (dataset._decimated) {
          const data = dataset._data;
          delete dataset._decimated;
          delete dataset._data;
          Object.defineProperty(dataset, 'data', {
              configurable: true,
              enumerable: true,
              writable: true,
              value: data
          });
      }
  }
  function cleanDecimatedData(chart) {
      chart.data.datasets.forEach((dataset)=>{
          cleanDecimatedDataset(dataset);
      });
  }
  function getStartAndCountOfVisiblePointsSimplified(meta, points) {
      const pointCount = points.length;
      let start = 0;
      let count;
      const { iScale  } = meta;
      const { min , max , minDefined , maxDefined  } = iScale.getUserBounds();
      if (minDefined) {
          start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
      }
      if (maxDefined) {
          count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
      } else {
          count = pointCount - start;
      }
      return {
          start,
          count
      };
  }
  var plugin_decimation = {
      id: 'decimation',
      defaults: {
          algorithm: 'min-max',
          enabled: false
      },
      beforeElementsUpdate: (chart, args, options)=>{
          if (!options.enabled) {
              cleanDecimatedData(chart);
              return;
          }
          const availableWidth = chart.width;
          chart.data.datasets.forEach((dataset, datasetIndex)=>{
              const { _data , indexAxis  } = dataset;
              const meta = chart.getDatasetMeta(datasetIndex);
              const data = _data || dataset.data;
              if (resolve([
                  indexAxis,
                  chart.options.indexAxis
              ]) === 'y') {
                  return;
              }
              if (!meta.controller.supportsDecimation) {
                  return;
              }
              const xAxis = chart.scales[meta.xAxisID];
              if (xAxis.type !== 'linear' && xAxis.type !== 'time') {
                  return;
              }
              if (chart.options.parsing) {
                  return;
              }
              let { start , count  } = getStartAndCountOfVisiblePointsSimplified(meta, data);
              const threshold = options.threshold || 4 * availableWidth;
              if (count <= threshold) {
                  cleanDecimatedDataset(dataset);
                  return;
              }
              if (isNullOrUndef(_data)) {
                  dataset._data = data;
                  delete dataset.data;
                  Object.defineProperty(dataset, 'data', {
                      configurable: true,
                      enumerable: true,
                      get: function() {
                          return this._decimated;
                      },
                      set: function(d) {
                          this._data = d;
                      }
                  });
              }
              let decimated;
              switch(options.algorithm){
                  case 'lttb':
                      decimated = lttbDecimation(data, start, count, availableWidth, options);
                      break;
                  case 'min-max':
                      decimated = minMaxDecimation(data, start, count, availableWidth);
                      break;
                  default:
                      throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
              }
              dataset._decimated = decimated;
          });
      },
      destroy (chart) {
          cleanDecimatedData(chart);
      }
  };

  function _segments(line, target, property) {
      const segments = line.segments;
      const points = line.points;
      const tpoints = target.points;
      const parts = [];
      for (const segment of segments){
          let { start , end  } = segment;
          end = _findSegmentEnd(start, end, points);
          const bounds = _getBounds(property, points[start], points[end], segment.loop);
          if (!target.segments) {
              parts.push({
                  source: segment,
                  target: bounds,
                  start: points[start],
                  end: points[end]
              });
              continue;
          }
          const targetSegments = _boundSegments(target, bounds);
          for (const tgt of targetSegments){
              const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
              const fillSources = _boundSegment(segment, points, subBounds);
              for (const fillSource of fillSources){
                  parts.push({
                      source: fillSource,
                      target: tgt,
                      start: {
                          [property]: _getEdge(bounds, subBounds, 'start', Math.max)
                      },
                      end: {
                          [property]: _getEdge(bounds, subBounds, 'end', Math.min)
                      }
                  });
              }
          }
      }
      return parts;
  }
  function _getBounds(property, first, last, loop) {
      if (loop) {
          return;
      }
      let start = first[property];
      let end = last[property];
      if (property === 'angle') {
          start = _normalizeAngle(start);
          end = _normalizeAngle(end);
      }
      return {
          property,
          start,
          end
      };
  }
  function _pointsFromSegments(boundary, line) {
      const { x =null , y =null  } = boundary || {};
      const linePoints = line.points;
      const points = [];
      line.segments.forEach(({ start , end  })=>{
          end = _findSegmentEnd(start, end, linePoints);
          const first = linePoints[start];
          const last = linePoints[end];
          if (y !== null) {
              points.push({
                  x: first.x,
                  y
              });
              points.push({
                  x: last.x,
                  y
              });
          } else if (x !== null) {
              points.push({
                  x,
                  y: first.y
              });
              points.push({
                  x,
                  y: last.y
              });
          }
      });
      return points;
  }
  function _findSegmentEnd(start, end, points) {
      for(; end > start; end--){
          const point = points[end];
          if (!isNaN(point.x) && !isNaN(point.y)) {
              break;
          }
      }
      return end;
  }
  function _getEdge(a, b, prop, fn) {
      if (a && b) {
          return fn(a[prop], b[prop]);
      }
      return a ? a[prop] : b ? b[prop] : 0;
  }

  function _createBoundaryLine(boundary, line) {
      let points = [];
      let _loop = false;
      if (isArray(boundary)) {
          _loop = true;
          points = boundary;
      } else {
          points = _pointsFromSegments(boundary, line);
      }
      return points.length ? new LineElement({
          points,
          options: {
              tension: 0
          },
          _loop,
          _fullLoop: _loop
      }) : null;
  }
  function _shouldApplyFill(source) {
      return source && source.fill !== false;
  }

  function _resolveTarget(sources, index, propagate) {
      const source = sources[index];
      let fill = source.fill;
      const visited = [
          index
      ];
      let target;
      if (!propagate) {
          return fill;
      }
      while(fill !== false && visited.indexOf(fill) === -1){
          if (!isNumberFinite(fill)) {
              return fill;
          }
          target = sources[fill];
          if (!target) {
              return false;
          }
          if (target.visible) {
              return fill;
          }
          visited.push(fill);
          fill = target.fill;
      }
      return false;
  }
   function _decodeFill(line, index, count) {
       const fill = parseFillOption(line);
      if (isObject(fill)) {
          return isNaN(fill.value) ? false : fill;
      }
      let target = parseFloat(fill);
      if (isNumberFinite(target) && Math.floor(target) === target) {
          return decodeTargetIndex(fill[0], index, target, count);
      }
      return [
          'origin',
          'start',
          'end',
          'stack',
          'shape'
      ].indexOf(fill) >= 0 && fill;
  }
  function decodeTargetIndex(firstCh, index, target, count) {
      if (firstCh === '-' || firstCh === '+') {
          target = index + target;
      }
      if (target === index || target < 0 || target >= count) {
          return false;
      }
      return target;
  }
   function _getTargetPixel(fill, scale) {
      let pixel = null;
      if (fill === 'start') {
          pixel = scale.bottom;
      } else if (fill === 'end') {
          pixel = scale.top;
      } else if (isObject(fill)) {
          pixel = scale.getPixelForValue(fill.value);
      } else if (scale.getBasePixel) {
          pixel = scale.getBasePixel();
      }
      return pixel;
  }
   function _getTargetValue(fill, scale, startValue) {
      let value;
      if (fill === 'start') {
          value = startValue;
      } else if (fill === 'end') {
          value = scale.options.reverse ? scale.min : scale.max;
      } else if (isObject(fill)) {
          value = fill.value;
      } else {
          value = scale.getBaseValue();
      }
      return value;
  }
   function parseFillOption(line) {
      const options = line.options;
      const fillOption = options.fill;
      let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
      if (fill === undefined) {
          fill = !!options.backgroundColor;
      }
      if (fill === false || fill === null) {
          return false;
      }
      if (fill === true) {
          return 'origin';
      }
      return fill;
  }

  function _buildStackLine(source) {
      const { scale , index , line  } = source;
      const points = [];
      const segments = line.segments;
      const sourcePoints = line.points;
      const linesBelow = getLinesBelow(scale, index);
      linesBelow.push(_createBoundaryLine({
          x: null,
          y: scale.bottom
      }, line));
      for(let i = 0; i < segments.length; i++){
          const segment = segments[i];
          for(let j = segment.start; j <= segment.end; j++){
              addPointsBelow(points, sourcePoints[j], linesBelow);
          }
      }
      return new LineElement({
          points,
          options: {}
      });
  }
   function getLinesBelow(scale, index) {
      const below = [];
      const metas = scale.getMatchingVisibleMetas('line');
      for(let i = 0; i < metas.length; i++){
          const meta = metas[i];
          if (meta.index === index) {
              break;
          }
          if (!meta.hidden) {
              below.unshift(meta.dataset);
          }
      }
      return below;
  }
   function addPointsBelow(points, sourcePoint, linesBelow) {
      const postponed = [];
      for(let j = 0; j < linesBelow.length; j++){
          const line = linesBelow[j];
          const { first , last , point  } = findPoint(line, sourcePoint, 'x');
          if (!point || first && last) {
              continue;
          }
          if (first) {
              postponed.unshift(point);
          } else {
              points.push(point);
              if (!last) {
                  break;
              }
          }
      }
      points.push(...postponed);
  }
   function findPoint(line, sourcePoint, property) {
      const point = line.interpolate(sourcePoint, property);
      if (!point) {
          return {};
      }
      const pointValue = point[property];
      const segments = line.segments;
      const linePoints = line.points;
      let first = false;
      let last = false;
      for(let i = 0; i < segments.length; i++){
          const segment = segments[i];
          const firstValue = linePoints[segment.start][property];
          const lastValue = linePoints[segment.end][property];
          if (_isBetween(pointValue, firstValue, lastValue)) {
              first = pointValue === firstValue;
              last = pointValue === lastValue;
              break;
          }
      }
      return {
          first,
          last,
          point
      };
  }

  class simpleArc {
      constructor(opts){
          this.x = opts.x;
          this.y = opts.y;
          this.radius = opts.radius;
      }
      pathSegment(ctx, bounds, opts) {
          const { x , y , radius  } = this;
          bounds = bounds || {
              start: 0,
              end: TAU
          };
          ctx.arc(x, y, radius, bounds.end, bounds.start, true);
          return !opts.bounds;
      }
      interpolate(point) {
          const { x , y , radius  } = this;
          const angle = point.angle;
          return {
              x: x + Math.cos(angle) * radius,
              y: y + Math.sin(angle) * radius,
              angle
          };
      }
  }

  function _getTarget(source) {
      const { chart , fill , line  } = source;
      if (isNumberFinite(fill)) {
          return getLineByIndex(chart, fill);
      }
      if (fill === 'stack') {
          return _buildStackLine(source);
      }
      if (fill === 'shape') {
          return true;
      }
      const boundary = computeBoundary(source);
      if (boundary instanceof simpleArc) {
          return boundary;
      }
      return _createBoundaryLine(boundary, line);
  }
   function getLineByIndex(chart, index) {
      const meta = chart.getDatasetMeta(index);
      const visible = meta && chart.isDatasetVisible(index);
      return visible ? meta.dataset : null;
  }
  function computeBoundary(source) {
      const scale = source.scale || {};
      if (scale.getPointPositionForValue) {
          return computeCircularBoundary(source);
      }
      return computeLinearBoundary(source);
  }
  function computeLinearBoundary(source) {
      const { scale ={} , fill  } = source;
      const pixel = _getTargetPixel(fill, scale);
      if (isNumberFinite(pixel)) {
          const horizontal = scale.isHorizontal();
          return {
              x: horizontal ? pixel : null,
              y: horizontal ? null : pixel
          };
      }
      return null;
  }
  function computeCircularBoundary(source) {
      const { scale , fill  } = source;
      const options = scale.options;
      const length = scale.getLabels().length;
      const start = options.reverse ? scale.max : scale.min;
      const value = _getTargetValue(fill, scale, start);
      const target = [];
      if (options.grid.circular) {
          const center = scale.getPointPositionForValue(0, start);
          return new simpleArc({
              x: center.x,
              y: center.y,
              radius: scale.getDistanceFromCenterForValue(value)
          });
      }
      for(let i = 0; i < length; ++i){
          target.push(scale.getPointPositionForValue(i, value));
      }
      return target;
  }

  function _drawfill(ctx, source, area) {
      const target = _getTarget(source);
      const { chart , index , line , scale , axis  } = source;
      const lineOpts = line.options;
      const fillOption = lineOpts.fill;
      const color = lineOpts.backgroundColor;
      const { above =color , below =color  } = fillOption || {};
      const meta = chart.getDatasetMeta(index);
      const clip = getDatasetClipArea(chart, meta);
      if (target && line.points.length) {
          clipArea(ctx, area);
          doFill(ctx, {
              line,
              target,
              above,
              below,
              area,
              scale,
              axis,
              clip
          });
          unclipArea(ctx);
      }
  }
  function doFill(ctx, cfg) {
      const { line , target , above , below , area , scale , clip  } = cfg;
      const property = line._loop ? 'angle' : cfg.axis;
      ctx.save();
      if (property === 'x' && below !== above) {
          clipVertical(ctx, target, area.top);
          fill(ctx, {
              line,
              target,
              color: above,
              scale,
              property,
              clip
          });
          ctx.restore();
          ctx.save();
          clipVertical(ctx, target, area.bottom);
      }
      fill(ctx, {
          line,
          target,
          color: below,
          scale,
          property,
          clip
      });
      ctx.restore();
  }
  function clipVertical(ctx, target, clipY) {
      const { segments , points  } = target;
      let first = true;
      let lineLoop = false;
      ctx.beginPath();
      for (const segment of segments){
          const { start , end  } = segment;
          const firstPoint = points[start];
          const lastPoint = points[_findSegmentEnd(start, end, points)];
          if (first) {
              ctx.moveTo(firstPoint.x, firstPoint.y);
              first = false;
          } else {
              ctx.lineTo(firstPoint.x, clipY);
              ctx.lineTo(firstPoint.x, firstPoint.y);
          }
          lineLoop = !!target.pathSegment(ctx, segment, {
              move: lineLoop
          });
          if (lineLoop) {
              ctx.closePath();
          } else {
              ctx.lineTo(lastPoint.x, clipY);
          }
      }
      ctx.lineTo(target.first().x, clipY);
      ctx.closePath();
      ctx.clip();
  }
  function fill(ctx, cfg) {
      const { line , target , property , color , scale , clip  } = cfg;
      const segments = _segments(line, target, property);
      for (const { source: src , target: tgt , start , end  } of segments){
          const { style: { backgroundColor =color  } = {}  } = src;
          const notShape = target !== true;
          ctx.save();
          ctx.fillStyle = backgroundColor;
          clipBounds(ctx, scale, clip, notShape && _getBounds(property, start, end));
          ctx.beginPath();
          const lineLoop = !!line.pathSegment(ctx, src);
          let loop;
          if (notShape) {
              if (lineLoop) {
                  ctx.closePath();
              } else {
                  interpolatedLineTo(ctx, target, end, property);
              }
              const targetLoop = !!target.pathSegment(ctx, tgt, {
                  move: lineLoop,
                  reverse: true
              });
              loop = lineLoop && targetLoop;
              if (!loop) {
                  interpolatedLineTo(ctx, target, start, property);
              }
          }
          ctx.closePath();
          ctx.fill(loop ? 'evenodd' : 'nonzero');
          ctx.restore();
      }
  }
  function clipBounds(ctx, scale, clip, bounds) {
      const chartArea = scale.chart.chartArea;
      const { property , start , end  } = bounds || {};
      if (property === 'x' || property === 'y') {
          let left, top, right, bottom;
          if (property === 'x') {
              left = start;
              top = chartArea.top;
              right = end;
              bottom = chartArea.bottom;
          } else {
              left = chartArea.left;
              top = start;
              right = chartArea.right;
              bottom = end;
          }
          ctx.beginPath();
          if (clip) {
              left = Math.max(left, clip.left);
              right = Math.min(right, clip.right);
              top = Math.max(top, clip.top);
              bottom = Math.min(bottom, clip.bottom);
          }
          ctx.rect(left, top, right - left, bottom - top);
          ctx.clip();
      }
  }
  function interpolatedLineTo(ctx, target, point, property) {
      const interpolatedPoint = target.interpolate(point, property);
      if (interpolatedPoint) {
          ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
      }
  }

  var index = {
      id: 'filler',
      afterDatasetsUpdate (chart, _args, options) {
          const count = (chart.data.datasets || []).length;
          const sources = [];
          let meta, i, line, source;
          for(i = 0; i < count; ++i){
              meta = chart.getDatasetMeta(i);
              line = meta.dataset;
              source = null;
              if (line && line.options && line instanceof LineElement) {
                  source = {
                      visible: chart.isDatasetVisible(i),
                      index: i,
                      fill: _decodeFill(line, i, count),
                      chart,
                      axis: meta.controller.options.indexAxis,
                      scale: meta.vScale,
                      line
                  };
              }
              meta.$filler = source;
              sources.push(source);
          }
          for(i = 0; i < count; ++i){
              source = sources[i];
              if (!source || source.fill === false) {
                  continue;
              }
              source.fill = _resolveTarget(sources, i, options.propagate);
          }
      },
      beforeDraw (chart, _args, options) {
          const draw = options.drawTime === 'beforeDraw';
          const metasets = chart.getSortedVisibleDatasetMetas();
          const area = chart.chartArea;
          for(let i = metasets.length - 1; i >= 0; --i){
              const source = metasets[i].$filler;
              if (!source) {
                  continue;
              }
              source.line.updateControlPoints(area, source.axis);
              if (draw && source.fill) {
                  _drawfill(chart.ctx, source, area);
              }
          }
      },
      beforeDatasetsDraw (chart, _args, options) {
          if (options.drawTime !== 'beforeDatasetsDraw') {
              return;
          }
          const metasets = chart.getSortedVisibleDatasetMetas();
          for(let i = metasets.length - 1; i >= 0; --i){
              const source = metasets[i].$filler;
              if (_shouldApplyFill(source)) {
                  _drawfill(chart.ctx, source, chart.chartArea);
              }
          }
      },
      beforeDatasetDraw (chart, args, options) {
          const source = args.meta.$filler;
          if (!_shouldApplyFill(source) || options.drawTime !== 'beforeDatasetDraw') {
              return;
          }
          _drawfill(chart.ctx, source, chart.chartArea);
      },
      defaults: {
          propagate: true,
          drawTime: 'beforeDatasetDraw'
      }
  };

  const getBoxSize = (labelOpts, fontSize)=>{
      let { boxHeight =fontSize , boxWidth =fontSize  } = labelOpts;
      if (labelOpts.usePointStyle) {
          boxHeight = Math.min(boxHeight, fontSize);
          boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
      }
      return {
          boxWidth,
          boxHeight,
          itemHeight: Math.max(fontSize, boxHeight)
      };
  };
  const itemsEqual = (a, b)=>a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
  class Legend extends Element {
   constructor(config){
          super();
          this._added = false;
          this.legendHitBoxes = [];
   this._hoveredItem = null;
          this.doughnutMode = false;
          this.chart = config.chart;
          this.options = config.options;
          this.ctx = config.ctx;
          this.legendItems = undefined;
          this.columnSizes = undefined;
          this.lineWidths = undefined;
          this.maxHeight = undefined;
          this.maxWidth = undefined;
          this.top = undefined;
          this.bottom = undefined;
          this.left = undefined;
          this.right = undefined;
          this.height = undefined;
          this.width = undefined;
          this._margins = undefined;
          this.position = undefined;
          this.weight = undefined;
          this.fullSize = undefined;
      }
      update(maxWidth, maxHeight, margins) {
          this.maxWidth = maxWidth;
          this.maxHeight = maxHeight;
          this._margins = margins;
          this.setDimensions();
          this.buildLabels();
          this.fit();
      }
      setDimensions() {
          if (this.isHorizontal()) {
              this.width = this.maxWidth;
              this.left = this._margins.left;
              this.right = this.width;
          } else {
              this.height = this.maxHeight;
              this.top = this._margins.top;
              this.bottom = this.height;
          }
      }
      buildLabels() {
          const labelOpts = this.options.labels || {};
          let legendItems = callback(labelOpts.generateLabels, [
              this.chart
          ], this) || [];
          if (labelOpts.filter) {
              legendItems = legendItems.filter((item)=>labelOpts.filter(item, this.chart.data));
          }
          if (labelOpts.sort) {
              legendItems = legendItems.sort((a, b)=>labelOpts.sort(a, b, this.chart.data));
          }
          if (this.options.reverse) {
              legendItems.reverse();
          }
          this.legendItems = legendItems;
      }
      fit() {
          const { options , ctx  } = this;
          if (!options.display) {
              this.width = this.height = 0;
              return;
          }
          const labelOpts = options.labels;
          const labelFont = toFont(labelOpts.font);
          const fontSize = labelFont.size;
          const titleHeight = this._computeTitleHeight();
          const { boxWidth , itemHeight  } = getBoxSize(labelOpts, fontSize);
          let width, height;
          ctx.font = labelFont.string;
          if (this.isHorizontal()) {
              width = this.maxWidth;
              height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
          } else {
              height = this.maxHeight;
              width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
          }
          this.width = Math.min(width, options.maxWidth || this.maxWidth);
          this.height = Math.min(height, options.maxHeight || this.maxHeight);
      }
   _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
          const { ctx , maxWidth , options: { labels: { padding  }  }  } = this;
          const hitboxes = this.legendHitBoxes = [];
          const lineWidths = this.lineWidths = [
              0
          ];
          const lineHeight = itemHeight + padding;
          let totalHeight = titleHeight;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          let row = -1;
          let top = -lineHeight;
          this.legendItems.forEach((legendItem, i)=>{
              const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
              if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                  totalHeight += lineHeight;
                  lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                  top += lineHeight;
                  row++;
              }
              hitboxes[i] = {
                  left: 0,
                  top,
                  row,
                  width: itemWidth,
                  height: itemHeight
              };
              lineWidths[lineWidths.length - 1] += itemWidth + padding;
          });
          return totalHeight;
      }
      _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
          const { ctx , maxHeight , options: { labels: { padding  }  }  } = this;
          const hitboxes = this.legendHitBoxes = [];
          const columnSizes = this.columnSizes = [];
          const heightLimit = maxHeight - titleHeight;
          let totalWidth = padding;
          let currentColWidth = 0;
          let currentColHeight = 0;
          let left = 0;
          let col = 0;
          this.legendItems.forEach((legendItem, i)=>{
              const { itemWidth , itemHeight  } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
              if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                  totalWidth += currentColWidth + padding;
                  columnSizes.push({
                      width: currentColWidth,
                      height: currentColHeight
                  });
                  left += currentColWidth + padding;
                  col++;
                  currentColWidth = currentColHeight = 0;
              }
              hitboxes[i] = {
                  left,
                  top: currentColHeight,
                  col,
                  width: itemWidth,
                  height: itemHeight
              };
              currentColWidth = Math.max(currentColWidth, itemWidth);
              currentColHeight += itemHeight + padding;
          });
          totalWidth += currentColWidth;
          columnSizes.push({
              width: currentColWidth,
              height: currentColHeight
          });
          return totalWidth;
      }
      adjustHitBoxes() {
          if (!this.options.display) {
              return;
          }
          const titleHeight = this._computeTitleHeight();
          const { legendHitBoxes: hitboxes , options: { align , labels: { padding  } , rtl  }  } = this;
          const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
          if (this.isHorizontal()) {
              let row = 0;
              let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
              for (const hitbox of hitboxes){
                  if (row !== hitbox.row) {
                      row = hitbox.row;
                      left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                  }
                  hitbox.top += this.top + titleHeight + padding;
                  hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                  left += hitbox.width + padding;
              }
          } else {
              let col = 0;
              let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
              for (const hitbox of hitboxes){
                  if (hitbox.col !== col) {
                      col = hitbox.col;
                      top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                  }
                  hitbox.top = top;
                  hitbox.left += this.left + padding;
                  hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
                  top += hitbox.height + padding;
              }
          }
      }
      isHorizontal() {
          return this.options.position === 'top' || this.options.position === 'bottom';
      }
      draw() {
          if (this.options.display) {
              const ctx = this.ctx;
              clipArea(ctx, this);
              this._draw();
              unclipArea(ctx);
          }
      }
   _draw() {
          const { options: opts , columnSizes , lineWidths , ctx  } = this;
          const { align , labels: labelOpts  } = opts;
          const defaultColor = defaults.color;
          const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
          const labelFont = toFont(labelOpts.font);
          const { padding  } = labelOpts;
          const fontSize = labelFont.size;
          const halfFontSize = fontSize / 2;
          let cursor;
          this.drawTitle();
          ctx.textAlign = rtlHelper.textAlign('left');
          ctx.textBaseline = 'middle';
          ctx.lineWidth = 0.5;
          ctx.font = labelFont.string;
          const { boxWidth , boxHeight , itemHeight  } = getBoxSize(labelOpts, fontSize);
          const drawLegendBox = function(x, y, legendItem) {
              if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
                  return;
              }
              ctx.save();
              const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
              ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
              ctx.lineCap = valueOrDefault(legendItem.lineCap, 'butt');
              ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
              ctx.lineJoin = valueOrDefault(legendItem.lineJoin, 'miter');
              ctx.lineWidth = lineWidth;
              ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
              ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
              if (labelOpts.usePointStyle) {
                  const drawOptions = {
                      radius: boxHeight * Math.SQRT2 / 2,
                      pointStyle: legendItem.pointStyle,
                      rotation: legendItem.rotation,
                      borderWidth: lineWidth
                  };
                  const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                  const centerY = y + halfFontSize;
                  drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
              } else {
                  const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                  const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                  const borderRadius = toTRBLCorners(legendItem.borderRadius);
                  ctx.beginPath();
                  if (Object.values(borderRadius).some((v)=>v !== 0)) {
                      addRoundedRectPath(ctx, {
                          x: xBoxLeft,
                          y: yBoxTop,
                          w: boxWidth,
                          h: boxHeight,
                          radius: borderRadius
                      });
                  } else {
                      ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                  }
                  ctx.fill();
                  if (lineWidth !== 0) {
                      ctx.stroke();
                  }
              }
              ctx.restore();
          };
          const fillText = function(x, y, legendItem) {
              renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                  strikethrough: legendItem.hidden,
                  textAlign: rtlHelper.textAlign(legendItem.textAlign)
              });
          };
          const isHorizontal = this.isHorizontal();
          const titleHeight = this._computeTitleHeight();
          if (isHorizontal) {
              cursor = {
                  x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
                  y: this.top + padding + titleHeight,
                  line: 0
              };
          } else {
              cursor = {
                  x: this.left + padding,
                  y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                  line: 0
              };
          }
          overrideTextDirection(this.ctx, opts.textDirection);
          const lineHeight = itemHeight + padding;
          this.legendItems.forEach((legendItem, i)=>{
              ctx.strokeStyle = legendItem.fontColor;
              ctx.fillStyle = legendItem.fontColor;
              const textWidth = ctx.measureText(legendItem.text).width;
              const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
              const width = boxWidth + halfFontSize + textWidth;
              let x = cursor.x;
              let y = cursor.y;
              rtlHelper.setWidth(this.width);
              if (isHorizontal) {
                  if (i > 0 && x + width + padding > this.right) {
                      y = cursor.y += lineHeight;
                      cursor.line++;
                      x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
                  }
              } else if (i > 0 && y + lineHeight > this.bottom) {
                  x = cursor.x = x + columnSizes[cursor.line].width + padding;
                  cursor.line++;
                  y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
              }
              const realX = rtlHelper.x(x);
              drawLegendBox(realX, y, legendItem);
              x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
              fillText(rtlHelper.x(x), y, legendItem);
              if (isHorizontal) {
                  cursor.x += width + padding;
              } else if (typeof legendItem.text !== 'string') {
                  const fontLineHeight = labelFont.lineHeight;
                  cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
              } else {
                  cursor.y += lineHeight;
              }
          });
          restoreTextDirection(this.ctx, opts.textDirection);
      }
   drawTitle() {
          const opts = this.options;
          const titleOpts = opts.title;
          const titleFont = toFont(titleOpts.font);
          const titlePadding = toPadding(titleOpts.padding);
          if (!titleOpts.display) {
              return;
          }
          const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
          const ctx = this.ctx;
          const position = titleOpts.position;
          const halfFontSize = titleFont.size / 2;
          const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
          let y;
          let left = this.left;
          let maxWidth = this.width;
          if (this.isHorizontal()) {
              maxWidth = Math.max(...this.lineWidths);
              y = this.top + topPaddingPlusHalfFontSize;
              left = _alignStartEnd(opts.align, left, this.right - maxWidth);
          } else {
              const maxHeight = this.columnSizes.reduce((acc, size)=>Math.max(acc, size.height), 0);
              y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
          }
          const x = _alignStartEnd(position, left, left + maxWidth);
          ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
          ctx.textBaseline = 'middle';
          ctx.strokeStyle = titleOpts.color;
          ctx.fillStyle = titleOpts.color;
          ctx.font = titleFont.string;
          renderText(ctx, titleOpts.text, x, y, titleFont);
      }
   _computeTitleHeight() {
          const titleOpts = this.options.title;
          const titleFont = toFont(titleOpts.font);
          const titlePadding = toPadding(titleOpts.padding);
          return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
      }
   _getLegendItemAt(x, y) {
          let i, hitBox, lh;
          if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
              lh = this.legendHitBoxes;
              for(i = 0; i < lh.length; ++i){
                  hitBox = lh[i];
                  if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) {
                      return this.legendItems[i];
                  }
              }
          }
          return null;
      }
   handleEvent(e) {
          const opts = this.options;
          if (!isListened(e.type, opts)) {
              return;
          }
          const hoveredItem = this._getLegendItemAt(e.x, e.y);
          if (e.type === 'mousemove' || e.type === 'mouseout') {
              const previous = this._hoveredItem;
              const sameItem = itemsEqual(previous, hoveredItem);
              if (previous && !sameItem) {
                  callback(opts.onLeave, [
                      e,
                      previous,
                      this
                  ], this);
              }
              this._hoveredItem = hoveredItem;
              if (hoveredItem && !sameItem) {
                  callback(opts.onHover, [
                      e,
                      hoveredItem,
                      this
                  ], this);
              }
          } else if (hoveredItem) {
              callback(opts.onClick, [
                  e,
                  hoveredItem,
                  this
              ], this);
          }
      }
  }
  function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
      const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
      const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
      return {
          itemWidth,
          itemHeight
      };
  }
  function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
      let legendItemText = legendItem.text;
      if (legendItemText && typeof legendItemText !== 'string') {
          legendItemText = legendItemText.reduce((a, b)=>a.length > b.length ? a : b);
      }
      return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
  }
  function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
      let itemHeight = _itemHeight;
      if (typeof legendItem.text !== 'string') {
          itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
      }
      return itemHeight;
  }
  function calculateLegendItemHeight(legendItem, fontLineHeight) {
      const labelHeight = legendItem.text ? legendItem.text.length : 0;
      return fontLineHeight * labelHeight;
  }
  function isListened(type, opts) {
      if ((type === 'mousemove' || type === 'mouseout') && (opts.onHover || opts.onLeave)) {
          return true;
      }
      if (opts.onClick && (type === 'click' || type === 'mouseup')) {
          return true;
      }
      return false;
  }
  var plugin_legend = {
      id: 'legend',
   _element: Legend,
      start (chart, _args, options) {
          const legend = chart.legend = new Legend({
              ctx: chart.ctx,
              options,
              chart
          });
          layouts.configure(chart, legend, options);
          layouts.addBox(chart, legend);
      },
      stop (chart) {
          layouts.removeBox(chart, chart.legend);
          delete chart.legend;
      },
      beforeUpdate (chart, _args, options) {
          const legend = chart.legend;
          layouts.configure(chart, legend, options);
          legend.options = options;
      },
      afterUpdate (chart) {
          const legend = chart.legend;
          legend.buildLabels();
          legend.adjustHitBoxes();
      },
      afterEvent (chart, args) {
          if (!args.replay) {
              chart.legend.handleEvent(args.event);
          }
      },
      defaults: {
          display: true,
          position: 'top',
          align: 'center',
          fullSize: true,
          reverse: false,
          weight: 1000,
          onClick (e, legendItem, legend) {
              const index = legendItem.datasetIndex;
              const ci = legend.chart;
              if (ci.isDatasetVisible(index)) {
                  ci.hide(index);
                  legendItem.hidden = true;
              } else {
                  ci.show(index);
                  legendItem.hidden = false;
              }
          },
          onHover: null,
          onLeave: null,
          labels: {
              color: (ctx)=>ctx.chart.options.color,
              boxWidth: 40,
              padding: 10,
              generateLabels (chart) {
                  const datasets = chart.data.datasets;
                  const { labels: { usePointStyle , pointStyle , textAlign , color , useBorderRadius , borderRadius  }  } = chart.legend.options;
                  return chart._getSortedDatasetMetas().map((meta)=>{
                      const style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
                      const borderWidth = toPadding(style.borderWidth);
                      return {
                          text: datasets[meta.index].label,
                          fillStyle: style.backgroundColor,
                          fontColor: color,
                          hidden: !meta.visible,
                          lineCap: style.borderCapStyle,
                          lineDash: style.borderDash,
                          lineDashOffset: style.borderDashOffset,
                          lineJoin: style.borderJoinStyle,
                          lineWidth: (borderWidth.width + borderWidth.height) / 4,
                          strokeStyle: style.borderColor,
                          pointStyle: pointStyle || style.pointStyle,
                          rotation: style.rotation,
                          textAlign: textAlign || style.textAlign,
                          borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                          datasetIndex: meta.index
                      };
                  }, this);
              }
          },
          title: {
              color: (ctx)=>ctx.chart.options.color,
              display: false,
              position: 'center',
              text: ''
          }
      },
      descriptors: {
          _scriptable: (name)=>!name.startsWith('on'),
          labels: {
              _scriptable: (name)=>![
                      'generateLabels',
                      'filter',
                      'sort'
                  ].includes(name)
          }
      }
  };

  class Title extends Element {
   constructor(config){
          super();
          this.chart = config.chart;
          this.options = config.options;
          this.ctx = config.ctx;
          this._padding = undefined;
          this.top = undefined;
          this.bottom = undefined;
          this.left = undefined;
          this.right = undefined;
          this.width = undefined;
          this.height = undefined;
          this.position = undefined;
          this.weight = undefined;
          this.fullSize = undefined;
      }
      update(maxWidth, maxHeight) {
          const opts = this.options;
          this.left = 0;
          this.top = 0;
          if (!opts.display) {
              this.width = this.height = this.right = this.bottom = 0;
              return;
          }
          this.width = this.right = maxWidth;
          this.height = this.bottom = maxHeight;
          const lineCount = isArray(opts.text) ? opts.text.length : 1;
          this._padding = toPadding(opts.padding);
          const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
          if (this.isHorizontal()) {
              this.height = textSize;
          } else {
              this.width = textSize;
          }
      }
      isHorizontal() {
          const pos = this.options.position;
          return pos === 'top' || pos === 'bottom';
      }
      _drawArgs(offset) {
          const { top , left , bottom , right , options  } = this;
          const align = options.align;
          let rotation = 0;
          let maxWidth, titleX, titleY;
          if (this.isHorizontal()) {
              titleX = _alignStartEnd(align, left, right);
              titleY = top + offset;
              maxWidth = right - left;
          } else {
              if (options.position === 'left') {
                  titleX = left + offset;
                  titleY = _alignStartEnd(align, bottom, top);
                  rotation = PI * -0.5;
              } else {
                  titleX = right - offset;
                  titleY = _alignStartEnd(align, top, bottom);
                  rotation = PI * 0.5;
              }
              maxWidth = bottom - top;
          }
          return {
              titleX,
              titleY,
              maxWidth,
              rotation
          };
      }
      draw() {
          const ctx = this.ctx;
          const opts = this.options;
          if (!opts.display) {
              return;
          }
          const fontOpts = toFont(opts.font);
          const lineHeight = fontOpts.lineHeight;
          const offset = lineHeight / 2 + this._padding.top;
          const { titleX , titleY , maxWidth , rotation  } = this._drawArgs(offset);
          renderText(ctx, opts.text, 0, 0, fontOpts, {
              color: opts.color,
              maxWidth,
              rotation,
              textAlign: _toLeftRightCenter(opts.align),
              textBaseline: 'middle',
              translation: [
                  titleX,
                  titleY
              ]
          });
      }
  }
  function createTitle(chart, titleOpts) {
      const title = new Title({
          ctx: chart.ctx,
          options: titleOpts,
          chart
      });
      layouts.configure(chart, title, titleOpts);
      layouts.addBox(chart, title);
      chart.titleBlock = title;
  }
  var plugin_title = {
      id: 'title',
   _element: Title,
      start (chart, _args, options) {
          createTitle(chart, options);
      },
      stop (chart) {
          const titleBlock = chart.titleBlock;
          layouts.removeBox(chart, titleBlock);
          delete chart.titleBlock;
      },
      beforeUpdate (chart, _args, options) {
          const title = chart.titleBlock;
          layouts.configure(chart, title, options);
          title.options = options;
      },
      defaults: {
          align: 'center',
          display: false,
          font: {
              weight: 'bold'
          },
          fullSize: true,
          padding: 10,
          position: 'top',
          text: '',
          weight: 2000
      },
      defaultRoutes: {
          color: 'color'
      },
      descriptors: {
          _scriptable: true,
          _indexable: false
      }
  };

  const map = new WeakMap();
  var plugin_subtitle = {
      id: 'subtitle',
      start (chart, _args, options) {
          const title = new Title({
              ctx: chart.ctx,
              options,
              chart
          });
          layouts.configure(chart, title, options);
          layouts.addBox(chart, title);
          map.set(chart, title);
      },
      stop (chart) {
          layouts.removeBox(chart, map.get(chart));
          map.delete(chart);
      },
      beforeUpdate (chart, _args, options) {
          const title = map.get(chart);
          layouts.configure(chart, title, options);
          title.options = options;
      },
      defaults: {
          align: 'center',
          display: false,
          font: {
              weight: 'normal'
          },
          fullSize: true,
          padding: 0,
          position: 'top',
          text: '',
          weight: 1500
      },
      defaultRoutes: {
          color: 'color'
      },
      descriptors: {
          _scriptable: true,
          _indexable: false
      }
  };

  const positioners = {
   average (items) {
          if (!items.length) {
              return false;
          }
          let i, len;
          let xSet = new Set();
          let y = 0;
          let count = 0;
          for(i = 0, len = items.length; i < len; ++i){
              const el = items[i].element;
              if (el && el.hasValue()) {
                  const pos = el.tooltipPosition();
                  xSet.add(pos.x);
                  y += pos.y;
                  ++count;
              }
          }
          if (count === 0 || xSet.size === 0) {
              return false;
          }
          const xAverage = [
              ...xSet
          ].reduce((a, b)=>a + b) / xSet.size;
          return {
              x: xAverage,
              y: y / count
          };
      },
   nearest (items, eventPosition) {
          if (!items.length) {
              return false;
          }
          let x = eventPosition.x;
          let y = eventPosition.y;
          let minDistance = Number.POSITIVE_INFINITY;
          let i, len, nearestElement;
          for(i = 0, len = items.length; i < len; ++i){
              const el = items[i].element;
              if (el && el.hasValue()) {
                  const center = el.getCenterPoint();
                  const d = distanceBetweenPoints(eventPosition, center);
                  if (d < minDistance) {
                      minDistance = d;
                      nearestElement = el;
                  }
              }
          }
          if (nearestElement) {
              const tp = nearestElement.tooltipPosition();
              x = tp.x;
              y = tp.y;
          }
          return {
              x,
              y
          };
      }
  };
  function pushOrConcat(base, toPush) {
      if (toPush) {
          if (isArray(toPush)) {
              Array.prototype.push.apply(base, toPush);
          } else {
              base.push(toPush);
          }
      }
      return base;
  }
   function splitNewlines(str) {
      if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
          return str.split('\n');
      }
      return str;
  }
   function createTooltipItem(chart, item) {
      const { element , datasetIndex , index  } = item;
      const controller = chart.getDatasetMeta(datasetIndex).controller;
      const { label , value  } = controller.getLabelAndValue(index);
      return {
          chart,
          label,
          parsed: controller.getParsed(index),
          raw: chart.data.datasets[datasetIndex].data[index],
          formattedValue: value,
          dataset: controller.getDataset(),
          dataIndex: index,
          datasetIndex,
          element
      };
  }
   function getTooltipSize(tooltip, options) {
      const ctx = tooltip.chart.ctx;
      const { body , footer , title  } = tooltip;
      const { boxWidth , boxHeight  } = options;
      const bodyFont = toFont(options.bodyFont);
      const titleFont = toFont(options.titleFont);
      const footerFont = toFont(options.footerFont);
      const titleLineCount = title.length;
      const footerLineCount = footer.length;
      const bodyLineItemCount = body.length;
      const padding = toPadding(options.padding);
      let height = padding.height;
      let width = 0;
      let combinedBodyLength = body.reduce((count, bodyItem)=>count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
      combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
      if (titleLineCount) {
          height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
      }
      if (combinedBodyLength) {
          const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
          height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
      }
      if (footerLineCount) {
          height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
      }
      let widthPadding = 0;
      const maxLineWidth = function(line) {
          width = Math.max(width, ctx.measureText(line).width + widthPadding);
      };
      ctx.save();
      ctx.font = titleFont.string;
      each(tooltip.title, maxLineWidth);
      ctx.font = bodyFont.string;
      each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
      widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
      each(body, (bodyItem)=>{
          each(bodyItem.before, maxLineWidth);
          each(bodyItem.lines, maxLineWidth);
          each(bodyItem.after, maxLineWidth);
      });
      widthPadding = 0;
      ctx.font = footerFont.string;
      each(tooltip.footer, maxLineWidth);
      ctx.restore();
      width += padding.width;
      return {
          width,
          height
      };
  }
  function determineYAlign(chart, size) {
      const { y , height  } = size;
      if (y < height / 2) {
          return 'top';
      } else if (y > chart.height - height / 2) {
          return 'bottom';
      }
      return 'center';
  }
  function doesNotFitWithAlign(xAlign, chart, options, size) {
      const { x , width  } = size;
      const caret = options.caretSize + options.caretPadding;
      if (xAlign === 'left' && x + width + caret > chart.width) {
          return true;
      }
      if (xAlign === 'right' && x - width - caret < 0) {
          return true;
      }
  }
  function determineXAlign(chart, options, size, yAlign) {
      const { x , width  } = size;
      const { width: chartWidth , chartArea: { left , right  }  } = chart;
      let xAlign = 'center';
      if (yAlign === 'center') {
          xAlign = x <= (left + right) / 2 ? 'left' : 'right';
      } else if (x <= width / 2) {
          xAlign = 'left';
      } else if (x >= chartWidth - width / 2) {
          xAlign = 'right';
      }
      if (doesNotFitWithAlign(xAlign, chart, options, size)) {
          xAlign = 'center';
      }
      return xAlign;
  }
   function determineAlignment(chart, options, size) {
      const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
      return {
          xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
          yAlign
      };
  }
  function alignX(size, xAlign) {
      let { x , width  } = size;
      if (xAlign === 'right') {
          x -= width;
      } else if (xAlign === 'center') {
          x -= width / 2;
      }
      return x;
  }
  function alignY(size, yAlign, paddingAndSize) {
      let { y , height  } = size;
      if (yAlign === 'top') {
          y += paddingAndSize;
      } else if (yAlign === 'bottom') {
          y -= height + paddingAndSize;
      } else {
          y -= height / 2;
      }
      return y;
  }
   function getBackgroundPoint(options, size, alignment, chart) {
      const { caretSize , caretPadding , cornerRadius  } = options;
      const { xAlign , yAlign  } = alignment;
      const paddingAndSize = caretSize + caretPadding;
      const { topLeft , topRight , bottomLeft , bottomRight  } = toTRBLCorners(cornerRadius);
      let x = alignX(size, xAlign);
      const y = alignY(size, yAlign, paddingAndSize);
      if (yAlign === 'center') {
          if (xAlign === 'left') {
              x += paddingAndSize;
          } else if (xAlign === 'right') {
              x -= paddingAndSize;
          }
      } else if (xAlign === 'left') {
          x -= Math.max(topLeft, bottomLeft) + caretSize;
      } else if (xAlign === 'right') {
          x += Math.max(topRight, bottomRight) + caretSize;
      }
      return {
          x: _limitValue(x, 0, chart.width - size.width),
          y: _limitValue(y, 0, chart.height - size.height)
      };
  }
  function getAlignedX(tooltip, align, options) {
      const padding = toPadding(options.padding);
      return align === 'center' ? tooltip.x + tooltip.width / 2 : align === 'right' ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
  }
   function getBeforeAfterBodyLines(callback) {
      return pushOrConcat([], splitNewlines(callback));
  }
  function createTooltipContext(parent, tooltip, tooltipItems) {
      return createContext(parent, {
          tooltip,
          tooltipItems,
          type: 'tooltip'
      });
  }
  function overrideCallbacks(callbacks, context) {
      const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
      return override ? callbacks.override(override) : callbacks;
  }
  const defaultCallbacks = {
      beforeTitle: noop,
      title (tooltipItems) {
          if (tooltipItems.length > 0) {
              const item = tooltipItems[0];
              const labels = item.chart.data.labels;
              const labelCount = labels ? labels.length : 0;
              if (this && this.options && this.options.mode === 'dataset') {
                  return item.dataset.label || '';
              } else if (item.label) {
                  return item.label;
              } else if (labelCount > 0 && item.dataIndex < labelCount) {
                  return labels[item.dataIndex];
              }
          }
          return '';
      },
      afterTitle: noop,
      beforeBody: noop,
      beforeLabel: noop,
      label (tooltipItem) {
          if (this && this.options && this.options.mode === 'dataset') {
              return tooltipItem.label + ': ' + tooltipItem.formattedValue || tooltipItem.formattedValue;
          }
          let label = tooltipItem.dataset.label || '';
          if (label) {
              label += ': ';
          }
          const value = tooltipItem.formattedValue;
          if (!isNullOrUndef(value)) {
              label += value;
          }
          return label;
      },
      labelColor (tooltipItem) {
          const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
          const options = meta.controller.getStyle(tooltipItem.dataIndex);
          return {
              borderColor: options.borderColor,
              backgroundColor: options.backgroundColor,
              borderWidth: options.borderWidth,
              borderDash: options.borderDash,
              borderDashOffset: options.borderDashOffset,
              borderRadius: 0
          };
      },
      labelTextColor () {
          return this.options.bodyColor;
      },
      labelPointStyle (tooltipItem) {
          const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
          const options = meta.controller.getStyle(tooltipItem.dataIndex);
          return {
              pointStyle: options.pointStyle,
              rotation: options.rotation
          };
      },
      afterLabel: noop,
      afterBody: noop,
      beforeFooter: noop,
      footer: noop,
      afterFooter: noop
  };
   function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
      const result = callbacks[name].call(ctx, arg);
      if (typeof result === 'undefined') {
          return defaultCallbacks[name].call(ctx, arg);
      }
      return result;
  }
  class Tooltip extends Element {
   static positioners = positioners;
      constructor(config){
          super();
          this.opacity = 0;
          this._active = [];
          this._eventPosition = undefined;
          this._size = undefined;
          this._cachedAnimations = undefined;
          this._tooltipItems = [];
          this.$animations = undefined;
          this.$context = undefined;
          this.chart = config.chart;
          this.options = config.options;
          this.dataPoints = undefined;
          this.title = undefined;
          this.beforeBody = undefined;
          this.body = undefined;
          this.afterBody = undefined;
          this.footer = undefined;
          this.xAlign = undefined;
          this.yAlign = undefined;
          this.x = undefined;
          this.y = undefined;
          this.height = undefined;
          this.width = undefined;
          this.caretX = undefined;
          this.caretY = undefined;
          this.labelColors = undefined;
          this.labelPointStyles = undefined;
          this.labelTextColors = undefined;
      }
      initialize(options) {
          this.options = options;
          this._cachedAnimations = undefined;
          this.$context = undefined;
      }
   _resolveAnimations() {
          const cached = this._cachedAnimations;
          if (cached) {
              return cached;
          }
          const chart = this.chart;
          const options = this.options.setContext(this.getContext());
          const opts = options.enabled && chart.options.animation && options.animations;
          const animations = new Animations(this.chart, opts);
          if (opts._cacheable) {
              this._cachedAnimations = Object.freeze(animations);
          }
          return animations;
      }
   getContext() {
          return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
      }
      getTitle(context, options) {
          const { callbacks  } = options;
          const beforeTitle = invokeCallbackWithFallback(callbacks, 'beforeTitle', this, context);
          const title = invokeCallbackWithFallback(callbacks, 'title', this, context);
          const afterTitle = invokeCallbackWithFallback(callbacks, 'afterTitle', this, context);
          let lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeTitle));
          lines = pushOrConcat(lines, splitNewlines(title));
          lines = pushOrConcat(lines, splitNewlines(afterTitle));
          return lines;
      }
      getBeforeBody(tooltipItems, options) {
          return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, 'beforeBody', this, tooltipItems));
      }
      getBody(tooltipItems, options) {
          const { callbacks  } = options;
          const bodyItems = [];
          each(tooltipItems, (context)=>{
              const bodyItem = {
                  before: [],
                  lines: [],
                  after: []
              };
              const scoped = overrideCallbacks(callbacks, context);
              pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, 'beforeLabel', this, context)));
              pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, 'label', this, context));
              pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, 'afterLabel', this, context)));
              bodyItems.push(bodyItem);
          });
          return bodyItems;
      }
      getAfterBody(tooltipItems, options) {
          return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, 'afterBody', this, tooltipItems));
      }
      getFooter(tooltipItems, options) {
          const { callbacks  } = options;
          const beforeFooter = invokeCallbackWithFallback(callbacks, 'beforeFooter', this, tooltipItems);
          const footer = invokeCallbackWithFallback(callbacks, 'footer', this, tooltipItems);
          const afterFooter = invokeCallbackWithFallback(callbacks, 'afterFooter', this, tooltipItems);
          let lines = [];
          lines = pushOrConcat(lines, splitNewlines(beforeFooter));
          lines = pushOrConcat(lines, splitNewlines(footer));
          lines = pushOrConcat(lines, splitNewlines(afterFooter));
          return lines;
      }
   _createItems(options) {
          const active = this._active;
          const data = this.chart.data;
          const labelColors = [];
          const labelPointStyles = [];
          const labelTextColors = [];
          let tooltipItems = [];
          let i, len;
          for(i = 0, len = active.length; i < len; ++i){
              tooltipItems.push(createTooltipItem(this.chart, active[i]));
          }
          if (options.filter) {
              tooltipItems = tooltipItems.filter((element, index, array)=>options.filter(element, index, array, data));
          }
          if (options.itemSort) {
              tooltipItems = tooltipItems.sort((a, b)=>options.itemSort(a, b, data));
          }
          each(tooltipItems, (context)=>{
              const scoped = overrideCallbacks(options.callbacks, context);
              labelColors.push(invokeCallbackWithFallback(scoped, 'labelColor', this, context));
              labelPointStyles.push(invokeCallbackWithFallback(scoped, 'labelPointStyle', this, context));
              labelTextColors.push(invokeCallbackWithFallback(scoped, 'labelTextColor', this, context));
          });
          this.labelColors = labelColors;
          this.labelPointStyles = labelPointStyles;
          this.labelTextColors = labelTextColors;
          this.dataPoints = tooltipItems;
          return tooltipItems;
      }
      update(changed, replay) {
          const options = this.options.setContext(this.getContext());
          const active = this._active;
          let properties;
          let tooltipItems = [];
          if (!active.length) {
              if (this.opacity !== 0) {
                  properties = {
                      opacity: 0
                  };
              }
          } else {
              const position = positioners[options.position].call(this, active, this._eventPosition);
              tooltipItems = this._createItems(options);
              this.title = this.getTitle(tooltipItems, options);
              this.beforeBody = this.getBeforeBody(tooltipItems, options);
              this.body = this.getBody(tooltipItems, options);
              this.afterBody = this.getAfterBody(tooltipItems, options);
              this.footer = this.getFooter(tooltipItems, options);
              const size = this._size = getTooltipSize(this, options);
              const positionAndSize = Object.assign({}, position, size);
              const alignment = determineAlignment(this.chart, options, positionAndSize);
              const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
              this.xAlign = alignment.xAlign;
              this.yAlign = alignment.yAlign;
              properties = {
                  opacity: 1,
                  x: backgroundPoint.x,
                  y: backgroundPoint.y,
                  width: size.width,
                  height: size.height,
                  caretX: position.x,
                  caretY: position.y
              };
          }
          this._tooltipItems = tooltipItems;
          this.$context = undefined;
          if (properties) {
              this._resolveAnimations().update(this, properties);
          }
          if (changed && options.external) {
              options.external.call(this, {
                  chart: this.chart,
                  tooltip: this,
                  replay
              });
          }
      }
      drawCaret(tooltipPoint, ctx, size, options) {
          const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
          ctx.lineTo(caretPosition.x1, caretPosition.y1);
          ctx.lineTo(caretPosition.x2, caretPosition.y2);
          ctx.lineTo(caretPosition.x3, caretPosition.y3);
      }
      getCaretPosition(tooltipPoint, size, options) {
          const { xAlign , yAlign  } = this;
          const { caretSize , cornerRadius  } = options;
          const { topLeft , topRight , bottomLeft , bottomRight  } = toTRBLCorners(cornerRadius);
          const { x: ptX , y: ptY  } = tooltipPoint;
          const { width , height  } = size;
          let x1, x2, x3, y1, y2, y3;
          if (yAlign === 'center') {
              y2 = ptY + height / 2;
              if (xAlign === 'left') {
                  x1 = ptX;
                  x2 = x1 - caretSize;
                  y1 = y2 + caretSize;
                  y3 = y2 - caretSize;
              } else {
                  x1 = ptX + width;
                  x2 = x1 + caretSize;
                  y1 = y2 - caretSize;
                  y3 = y2 + caretSize;
              }
              x3 = x1;
          } else {
              if (xAlign === 'left') {
                  x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
              } else if (xAlign === 'right') {
                  x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
              } else {
                  x2 = this.caretX;
              }
              if (yAlign === 'top') {
                  y1 = ptY;
                  y2 = y1 - caretSize;
                  x1 = x2 - caretSize;
                  x3 = x2 + caretSize;
              } else {
                  y1 = ptY + height;
                  y2 = y1 + caretSize;
                  x1 = x2 + caretSize;
                  x3 = x2 - caretSize;
              }
              y3 = y1;
          }
          return {
              x1,
              x2,
              x3,
              y1,
              y2,
              y3
          };
      }
      drawTitle(pt, ctx, options) {
          const title = this.title;
          const length = title.length;
          let titleFont, titleSpacing, i;
          if (length) {
              const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
              pt.x = getAlignedX(this, options.titleAlign, options);
              ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
              ctx.textBaseline = 'middle';
              titleFont = toFont(options.titleFont);
              titleSpacing = options.titleSpacing;
              ctx.fillStyle = options.titleColor;
              ctx.font = titleFont.string;
              for(i = 0; i < length; ++i){
                  ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                  pt.y += titleFont.lineHeight + titleSpacing;
                  if (i + 1 === length) {
                      pt.y += options.titleMarginBottom - titleSpacing;
                  }
              }
          }
      }
   _drawColorBox(ctx, pt, i, rtlHelper, options) {
          const labelColor = this.labelColors[i];
          const labelPointStyle = this.labelPointStyles[i];
          const { boxHeight , boxWidth  } = options;
          const bodyFont = toFont(options.bodyFont);
          const colorX = getAlignedX(this, 'left', options);
          const rtlColorX = rtlHelper.x(colorX);
          const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
          const colorY = pt.y + yOffSet;
          if (options.usePointStyle) {
              const drawOptions = {
                  radius: Math.min(boxWidth, boxHeight) / 2,
                  pointStyle: labelPointStyle.pointStyle,
                  rotation: labelPointStyle.rotation,
                  borderWidth: 1
              };
              const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
              const centerY = colorY + boxHeight / 2;
              ctx.strokeStyle = options.multiKeyBackground;
              ctx.fillStyle = options.multiKeyBackground;
              drawPoint(ctx, drawOptions, centerX, centerY);
              ctx.strokeStyle = labelColor.borderColor;
              ctx.fillStyle = labelColor.backgroundColor;
              drawPoint(ctx, drawOptions, centerX, centerY);
          } else {
              ctx.lineWidth = isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
              ctx.strokeStyle = labelColor.borderColor;
              ctx.setLineDash(labelColor.borderDash || []);
              ctx.lineDashOffset = labelColor.borderDashOffset || 0;
              const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
              const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
              const borderRadius = toTRBLCorners(labelColor.borderRadius);
              if (Object.values(borderRadius).some((v)=>v !== 0)) {
                  ctx.beginPath();
                  ctx.fillStyle = options.multiKeyBackground;
                  addRoundedRectPath(ctx, {
                      x: outerX,
                      y: colorY,
                      w: boxWidth,
                      h: boxHeight,
                      radius: borderRadius
                  });
                  ctx.fill();
                  ctx.stroke();
                  ctx.fillStyle = labelColor.backgroundColor;
                  ctx.beginPath();
                  addRoundedRectPath(ctx, {
                      x: innerX,
                      y: colorY + 1,
                      w: boxWidth - 2,
                      h: boxHeight - 2,
                      radius: borderRadius
                  });
                  ctx.fill();
              } else {
                  ctx.fillStyle = options.multiKeyBackground;
                  ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                  ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                  ctx.fillStyle = labelColor.backgroundColor;
                  ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
              }
          }
          ctx.fillStyle = this.labelTextColors[i];
      }
      drawBody(pt, ctx, options) {
          const { body  } = this;
          const { bodySpacing , bodyAlign , displayColors , boxHeight , boxWidth , boxPadding  } = options;
          const bodyFont = toFont(options.bodyFont);
          let bodyLineHeight = bodyFont.lineHeight;
          let xLinePadding = 0;
          const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
          const fillLineOfText = function(line) {
              ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
              pt.y += bodyLineHeight + bodySpacing;
          };
          const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
          let bodyItem, textColor, lines, i, j, ilen, jlen;
          ctx.textAlign = bodyAlign;
          ctx.textBaseline = 'middle';
          ctx.font = bodyFont.string;
          pt.x = getAlignedX(this, bodyAlignForCalculation, options);
          ctx.fillStyle = options.bodyColor;
          each(this.beforeBody, fillLineOfText);
          xLinePadding = displayColors && bodyAlignForCalculation !== 'right' ? bodyAlign === 'center' ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
          for(i = 0, ilen = body.length; i < ilen; ++i){
              bodyItem = body[i];
              textColor = this.labelTextColors[i];
              ctx.fillStyle = textColor;
              each(bodyItem.before, fillLineOfText);
              lines = bodyItem.lines;
              if (displayColors && lines.length) {
                  this._drawColorBox(ctx, pt, i, rtlHelper, options);
                  bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
              }
              for(j = 0, jlen = lines.length; j < jlen; ++j){
                  fillLineOfText(lines[j]);
                  bodyLineHeight = bodyFont.lineHeight;
              }
              each(bodyItem.after, fillLineOfText);
          }
          xLinePadding = 0;
          bodyLineHeight = bodyFont.lineHeight;
          each(this.afterBody, fillLineOfText);
          pt.y -= bodySpacing;
      }
      drawFooter(pt, ctx, options) {
          const footer = this.footer;
          const length = footer.length;
          let footerFont, i;
          if (length) {
              const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
              pt.x = getAlignedX(this, options.footerAlign, options);
              pt.y += options.footerMarginTop;
              ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
              ctx.textBaseline = 'middle';
              footerFont = toFont(options.footerFont);
              ctx.fillStyle = options.footerColor;
              ctx.font = footerFont.string;
              for(i = 0; i < length; ++i){
                  ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                  pt.y += footerFont.lineHeight + options.footerSpacing;
              }
          }
      }
      drawBackground(pt, ctx, tooltipSize, options) {
          const { xAlign , yAlign  } = this;
          const { x , y  } = pt;
          const { width , height  } = tooltipSize;
          const { topLeft , topRight , bottomLeft , bottomRight  } = toTRBLCorners(options.cornerRadius);
          ctx.fillStyle = options.backgroundColor;
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = options.borderWidth;
          ctx.beginPath();
          ctx.moveTo(x + topLeft, y);
          if (yAlign === 'top') {
              this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x + width - topRight, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
          if (yAlign === 'center' && xAlign === 'right') {
              this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x + width, y + height - bottomRight);
          ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
          if (yAlign === 'bottom') {
              this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x + bottomLeft, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
          if (yAlign === 'center' && xAlign === 'left') {
              this.drawCaret(pt, ctx, tooltipSize, options);
          }
          ctx.lineTo(x, y + topLeft);
          ctx.quadraticCurveTo(x, y, x + topLeft, y);
          ctx.closePath();
          ctx.fill();
          if (options.borderWidth > 0) {
              ctx.stroke();
          }
      }
   _updateAnimationTarget(options) {
          const chart = this.chart;
          const anims = this.$animations;
          const animX = anims && anims.x;
          const animY = anims && anims.y;
          if (animX || animY) {
              const position = positioners[options.position].call(this, this._active, this._eventPosition);
              if (!position) {
                  return;
              }
              const size = this._size = getTooltipSize(this, options);
              const positionAndSize = Object.assign({}, position, this._size);
              const alignment = determineAlignment(chart, options, positionAndSize);
              const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
              if (animX._to !== point.x || animY._to !== point.y) {
                  this.xAlign = alignment.xAlign;
                  this.yAlign = alignment.yAlign;
                  this.width = size.width;
                  this.height = size.height;
                  this.caretX = position.x;
                  this.caretY = position.y;
                  this._resolveAnimations().update(this, point);
              }
          }
      }
   _willRender() {
          return !!this.opacity;
      }
      draw(ctx) {
          const options = this.options.setContext(this.getContext());
          let opacity = this.opacity;
          if (!opacity) {
              return;
          }
          this._updateAnimationTarget(options);
          const tooltipSize = {
              width: this.width,
              height: this.height
          };
          const pt = {
              x: this.x,
              y: this.y
          };
          opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
          const padding = toPadding(options.padding);
          const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
          if (options.enabled && hasTooltipContent) {
              ctx.save();
              ctx.globalAlpha = opacity;
              this.drawBackground(pt, ctx, tooltipSize, options);
              overrideTextDirection(ctx, options.textDirection);
              pt.y += padding.top;
              this.drawTitle(pt, ctx, options);
              this.drawBody(pt, ctx, options);
              this.drawFooter(pt, ctx, options);
              restoreTextDirection(ctx, options.textDirection);
              ctx.restore();
          }
      }
   getActiveElements() {
          return this._active || [];
      }
   setActiveElements(activeElements, eventPosition) {
          const lastActive = this._active;
          const active = activeElements.map(({ datasetIndex , index  })=>{
              const meta = this.chart.getDatasetMeta(datasetIndex);
              if (!meta) {
                  throw new Error('Cannot find a dataset at index ' + datasetIndex);
              }
              return {
                  datasetIndex,
                  element: meta.data[index],
                  index
              };
          });
          const changed = !_elementsEqual(lastActive, active);
          const positionChanged = this._positionChanged(active, eventPosition);
          if (changed || positionChanged) {
              this._active = active;
              this._eventPosition = eventPosition;
              this._ignoreReplayEvents = true;
              this.update(true);
          }
      }
   handleEvent(e, replay, inChartArea = true) {
          if (replay && this._ignoreReplayEvents) {
              return false;
          }
          this._ignoreReplayEvents = false;
          const options = this.options;
          const lastActive = this._active || [];
          const active = this._getActiveElements(e, lastActive, replay, inChartArea);
          const positionChanged = this._positionChanged(active, e);
          const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
          if (changed) {
              this._active = active;
              if (options.enabled || options.external) {
                  this._eventPosition = {
                      x: e.x,
                      y: e.y
                  };
                  this.update(true, replay);
              }
          }
          return changed;
      }
   _getActiveElements(e, lastActive, replay, inChartArea) {
          const options = this.options;
          if (e.type === 'mouseout') {
              return [];
          }
          if (!inChartArea) {
              return lastActive.filter((i)=>this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== undefined);
          }
          const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
          if (options.reverse) {
              active.reverse();
          }
          return active;
      }
   _positionChanged(active, e) {
          const { caretX , caretY , options  } = this;
          const position = positioners[options.position].call(this, active, e);
          return position !== false && (caretX !== position.x || caretY !== position.y);
      }
  }
  var plugin_tooltip = {
      id: 'tooltip',
      _element: Tooltip,
      positioners,
      afterInit (chart, _args, options) {
          if (options) {
              chart.tooltip = new Tooltip({
                  chart,
                  options
              });
          }
      },
      beforeUpdate (chart, _args, options) {
          if (chart.tooltip) {
              chart.tooltip.initialize(options);
          }
      },
      reset (chart, _args, options) {
          if (chart.tooltip) {
              chart.tooltip.initialize(options);
          }
      },
      afterDraw (chart) {
          const tooltip = chart.tooltip;
          if (tooltip && tooltip._willRender()) {
              const args = {
                  tooltip
              };
              if (chart.notifyPlugins('beforeTooltipDraw', {
                  ...args,
                  cancelable: true
              }) === false) {
                  return;
              }
              tooltip.draw(chart.ctx);
              chart.notifyPlugins('afterTooltipDraw', args);
          }
      },
      afterEvent (chart, args) {
          if (chart.tooltip) {
              const useFinalPosition = args.replay;
              if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
                  args.changed = true;
              }
          }
      },
      defaults: {
          enabled: true,
          external: null,
          position: 'average',
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          titleFont: {
              weight: 'bold'
          },
          titleSpacing: 2,
          titleMarginBottom: 6,
          titleAlign: 'left',
          bodyColor: '#fff',
          bodySpacing: 2,
          bodyFont: {},
          bodyAlign: 'left',
          footerColor: '#fff',
          footerSpacing: 2,
          footerMarginTop: 6,
          footerFont: {
              weight: 'bold'
          },
          footerAlign: 'left',
          padding: 6,
          caretPadding: 2,
          caretSize: 5,
          cornerRadius: 6,
          boxHeight: (ctx, opts)=>opts.bodyFont.size,
          boxWidth: (ctx, opts)=>opts.bodyFont.size,
          multiKeyBackground: '#fff',
          displayColors: true,
          boxPadding: 0,
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          animation: {
              duration: 400,
              easing: 'easeOutQuart'
          },
          animations: {
              numbers: {
                  type: 'number',
                  properties: [
                      'x',
                      'y',
                      'width',
                      'height',
                      'caretX',
                      'caretY'
                  ]
              },
              opacity: {
                  easing: 'linear',
                  duration: 200
              }
          },
          callbacks: defaultCallbacks
      },
      defaultRoutes: {
          bodyFont: 'font',
          footerFont: 'font',
          titleFont: 'font'
      },
      descriptors: {
          _scriptable: (name)=>name !== 'filter' && name !== 'itemSort' && name !== 'external',
          _indexable: false,
          callbacks: {
              _scriptable: false,
              _indexable: false
          },
          animation: {
              _fallback: false
          },
          animations: {
              _fallback: 'animation'
          }
      },
      additionalOptionScopes: [
          'interaction'
      ]
  };

  var plugins = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Colors: plugin_colors,
  Decimation: plugin_decimation,
  Filler: index,
  Legend: plugin_legend,
  SubTitle: plugin_subtitle,
  Title: plugin_title,
  Tooltip: plugin_tooltip
  });

  const addIfString = (labels, raw, index, addedLabels)=>{
      if (typeof raw === 'string') {
          index = labels.push(raw) - 1;
          addedLabels.unshift({
              index,
              label: raw
          });
      } else if (isNaN(raw)) {
          index = null;
      }
      return index;
  };
  function findOrAddLabel(labels, raw, index, addedLabels) {
      const first = labels.indexOf(raw);
      if (first === -1) {
          return addIfString(labels, raw, index, addedLabels);
      }
      const last = labels.lastIndexOf(raw);
      return first !== last ? index : first;
  }
  const validIndex = (index, max)=>index === null ? null : _limitValue(Math.round(index), 0, max);
  function _getLabelForValue(value) {
      const labels = this.getLabels();
      if (value >= 0 && value < labels.length) {
          return labels[value];
      }
      return value;
  }
  class CategoryScale extends Scale {
      static id = 'category';
   static defaults = {
          ticks: {
              callback: _getLabelForValue
          }
      };
      constructor(cfg){
          super(cfg);
           this._startValue = undefined;
          this._valueRange = 0;
          this._addedLabels = [];
      }
      init(scaleOptions) {
          const added = this._addedLabels;
          if (added.length) {
              const labels = this.getLabels();
              for (const { index , label  } of added){
                  if (labels[index] === label) {
                      labels.splice(index, 1);
                  }
              }
              this._addedLabels = [];
          }
          super.init(scaleOptions);
      }
      parse(raw, index) {
          if (isNullOrUndef(raw)) {
              return null;
          }
          const labels = this.getLabels();
          index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
          return validIndex(index, labels.length - 1);
      }
      determineDataLimits() {
          const { minDefined , maxDefined  } = this.getUserBounds();
          let { min , max  } = this.getMinMax(true);
          if (this.options.bounds === 'ticks') {
              if (!minDefined) {
                  min = 0;
              }
              if (!maxDefined) {
                  max = this.getLabels().length - 1;
              }
          }
          this.min = min;
          this.max = max;
      }
      buildTicks() {
          const min = this.min;
          const max = this.max;
          const offset = this.options.offset;
          const ticks = [];
          let labels = this.getLabels();
          labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
          this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
          this._startValue = this.min - (offset ? 0.5 : 0);
          for(let value = min; value <= max; value++){
              ticks.push({
                  value
              });
          }
          return ticks;
      }
      getLabelForValue(value) {
          return _getLabelForValue.call(this, value);
      }
   configure() {
          super.configure();
          if (!this.isHorizontal()) {
              this._reversePixels = !this._reversePixels;
          }
      }
      getPixelForValue(value) {
          if (typeof value !== 'number') {
              value = this.parse(value);
          }
          return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
      }
      getPixelForTick(index) {
          const ticks = this.ticks;
          if (index < 0 || index > ticks.length - 1) {
              return null;
          }
          return this.getPixelForValue(ticks[index].value);
      }
      getValueForPixel(pixel) {
          return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
      }
      getBasePixel() {
          return this.bottom;
      }
  }

  function generateTicks$1(generationOptions, dataRange) {
      const ticks = [];
      const MIN_SPACING = 1e-14;
      const { bounds , step , min , max , precision , count , maxTicks , maxDigits , includeBounds  } = generationOptions;
      const unit = step || 1;
      const maxSpaces = maxTicks - 1;
      const { min: rmin , max: rmax  } = dataRange;
      const minDefined = !isNullOrUndef(min);
      const maxDefined = !isNullOrUndef(max);
      const countDefined = !isNullOrUndef(count);
      const minSpacing = (rmax - rmin) / (maxDigits + 1);
      let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
      let factor, niceMin, niceMax, numSpaces;
      if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
          return [
              {
                  value: rmin
              },
              {
                  value: rmax
              }
          ];
      }
      numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
      if (numSpaces > maxSpaces) {
          spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
      }
      if (!isNullOrUndef(precision)) {
          factor = Math.pow(10, precision);
          spacing = Math.ceil(spacing * factor) / factor;
      }
      if (bounds === 'ticks') {
          niceMin = Math.floor(rmin / spacing) * spacing;
          niceMax = Math.ceil(rmax / spacing) * spacing;
      } else {
          niceMin = rmin;
          niceMax = rmax;
      }
      if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1000)) {
          numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
          spacing = (max - min) / numSpaces;
          niceMin = min;
          niceMax = max;
      } else if (countDefined) {
          niceMin = minDefined ? min : niceMin;
          niceMax = maxDefined ? max : niceMax;
          numSpaces = count - 1;
          spacing = (niceMax - niceMin) / numSpaces;
      } else {
          numSpaces = (niceMax - niceMin) / spacing;
          if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
              numSpaces = Math.round(numSpaces);
          } else {
              numSpaces = Math.ceil(numSpaces);
          }
      }
      const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
      factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
      niceMin = Math.round(niceMin * factor) / factor;
      niceMax = Math.round(niceMax * factor) / factor;
      let j = 0;
      if (minDefined) {
          if (includeBounds && niceMin !== min) {
              ticks.push({
                  value: min
              });
              if (niceMin < min) {
                  j++;
              }
              if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
                  j++;
              }
          } else if (niceMin < min) {
              j++;
          }
      }
      for(; j < numSpaces; ++j){
          const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
          if (maxDefined && tickValue > max) {
              break;
          }
          ticks.push({
              value: tickValue
          });
      }
      if (maxDefined && includeBounds && niceMax !== max) {
          if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
              ticks[ticks.length - 1].value = max;
          } else {
              ticks.push({
                  value: max
              });
          }
      } else if (!maxDefined || niceMax === max) {
          ticks.push({
              value: niceMax
          });
      }
      return ticks;
  }
  function relativeLabelSize(value, minSpacing, { horizontal , minRotation  }) {
      const rad = toRadians(minRotation);
      const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 0.001;
      const length = 0.75 * minSpacing * ('' + value).length;
      return Math.min(minSpacing / ratio, length);
  }
  class LinearScaleBase extends Scale {
      constructor(cfg){
          super(cfg);
           this.start = undefined;
           this.end = undefined;
           this._startValue = undefined;
           this._endValue = undefined;
          this._valueRange = 0;
      }
      parse(raw, index) {
          if (isNullOrUndef(raw)) {
              return null;
          }
          if ((typeof raw === 'number' || raw instanceof Number) && !isFinite(+raw)) {
              return null;
          }
          return +raw;
      }
      handleTickRangeOptions() {
          const { beginAtZero  } = this.options;
          const { minDefined , maxDefined  } = this.getUserBounds();
          let { min , max  } = this;
          const setMin = (v)=>min = minDefined ? min : v;
          const setMax = (v)=>max = maxDefined ? max : v;
          if (beginAtZero) {
              const minSign = sign(min);
              const maxSign = sign(max);
              if (minSign < 0 && maxSign < 0) {
                  setMax(0);
              } else if (minSign > 0 && maxSign > 0) {
                  setMin(0);
              }
          }
          if (min === max) {
              let offset = max === 0 ? 1 : Math.abs(max * 0.05);
              setMax(max + offset);
              if (!beginAtZero) {
                  setMin(min - offset);
              }
          }
          this.min = min;
          this.max = max;
      }
      getTickLimit() {
          const tickOpts = this.options.ticks;
          let { maxTicksLimit , stepSize  } = tickOpts;
          let maxTicks;
          if (stepSize) {
              maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
              if (maxTicks > 1000) {
                  console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                  maxTicks = 1000;
              }
          } else {
              maxTicks = this.computeTickLimit();
              maxTicksLimit = maxTicksLimit || 11;
          }
          if (maxTicksLimit) {
              maxTicks = Math.min(maxTicksLimit, maxTicks);
          }
          return maxTicks;
      }
   computeTickLimit() {
          return Number.POSITIVE_INFINITY;
      }
      buildTicks() {
          const opts = this.options;
          const tickOpts = opts.ticks;
          let maxTicks = this.getTickLimit();
          maxTicks = Math.max(2, maxTicks);
          const numericGeneratorOptions = {
              maxTicks,
              bounds: opts.bounds,
              min: opts.min,
              max: opts.max,
              precision: tickOpts.precision,
              step: tickOpts.stepSize,
              count: tickOpts.count,
              maxDigits: this._maxDigits(),
              horizontal: this.isHorizontal(),
              minRotation: tickOpts.minRotation || 0,
              includeBounds: tickOpts.includeBounds !== false
          };
          const dataRange = this._range || this;
          const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
          if (opts.bounds === 'ticks') {
              _setMinAndMaxByKey(ticks, this, 'value');
          }
          if (opts.reverse) {
              ticks.reverse();
              this.start = this.max;
              this.end = this.min;
          } else {
              this.start = this.min;
              this.end = this.max;
          }
          return ticks;
      }
   configure() {
          const ticks = this.ticks;
          let start = this.min;
          let end = this.max;
          super.configure();
          if (this.options.offset && ticks.length) {
              const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
              start -= offset;
              end += offset;
          }
          this._startValue = start;
          this._endValue = end;
          this._valueRange = end - start;
      }
      getLabelForValue(value) {
          return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
      }
  }

  class LinearScale extends LinearScaleBase {
      static id = 'linear';
   static defaults = {
          ticks: {
              callback: Ticks.formatters.numeric
          }
      };
      determineDataLimits() {
          const { min , max  } = this.getMinMax(true);
          this.min = isNumberFinite(min) ? min : 0;
          this.max = isNumberFinite(max) ? max : 1;
          this.handleTickRangeOptions();
      }
   computeTickLimit() {
          const horizontal = this.isHorizontal();
          const length = horizontal ? this.width : this.height;
          const minRotation = toRadians(this.options.ticks.minRotation);
          const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 0.001;
          const tickFont = this._resolveTickFontOptions(0);
          return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
      }
      getPixelForValue(value) {
          return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
      }
      getValueForPixel(pixel) {
          return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
      }
  }

  const log10Floor = (v)=>Math.floor(log10(v));
  const changeExponent = (v, m)=>Math.pow(10, log10Floor(v) + m);
  function isMajor(tickVal) {
      const remain = tickVal / Math.pow(10, log10Floor(tickVal));
      return remain === 1;
  }
  function steps(min, max, rangeExp) {
      const rangeStep = Math.pow(10, rangeExp);
      const start = Math.floor(min / rangeStep);
      const end = Math.ceil(max / rangeStep);
      return end - start;
  }
  function startExp(min, max) {
      const range = max - min;
      let rangeExp = log10Floor(range);
      while(steps(min, max, rangeExp) > 10){
          rangeExp++;
      }
      while(steps(min, max, rangeExp) < 10){
          rangeExp--;
      }
      return Math.min(rangeExp, log10Floor(min));
  }
   function generateTicks(generationOptions, { min , max  }) {
      min = finiteOrDefault(generationOptions.min, min);
      const ticks = [];
      const minExp = log10Floor(min);
      let exp = startExp(min, max);
      let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
      const stepSize = Math.pow(10, exp);
      const base = minExp > exp ? Math.pow(10, minExp) : 0;
      const start = Math.round((min - base) * precision) / precision;
      const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
      let significand = Math.floor((start - offset) / Math.pow(10, exp));
      let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
      while(value < max){
          ticks.push({
              value,
              major: isMajor(value),
              significand
          });
          if (significand >= 10) {
              significand = significand < 15 ? 15 : 20;
          } else {
              significand++;
          }
          if (significand >= 20) {
              exp++;
              significand = 2;
              precision = exp >= 0 ? 1 : precision;
          }
          value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
      }
      const lastTick = finiteOrDefault(generationOptions.max, value);
      ticks.push({
          value: lastTick,
          major: isMajor(lastTick),
          significand
      });
      return ticks;
  }
  class LogarithmicScale extends Scale {
      static id = 'logarithmic';
   static defaults = {
          ticks: {
              callback: Ticks.formatters.logarithmic,
              major: {
                  enabled: true
              }
          }
      };
      constructor(cfg){
          super(cfg);
           this.start = undefined;
           this.end = undefined;
           this._startValue = undefined;
          this._valueRange = 0;
      }
      parse(raw, index) {
          const value = LinearScaleBase.prototype.parse.apply(this, [
              raw,
              index
          ]);
          if (value === 0) {
              this._zero = true;
              return undefined;
          }
          return isNumberFinite(value) && value > 0 ? value : null;
      }
      determineDataLimits() {
          const { min , max  } = this.getMinMax(true);
          this.min = isNumberFinite(min) ? Math.max(0, min) : null;
          this.max = isNumberFinite(max) ? Math.max(0, max) : null;
          if (this.options.beginAtZero) {
              this._zero = true;
          }
          if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) {
              this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
          }
          this.handleTickRangeOptions();
      }
      handleTickRangeOptions() {
          const { minDefined , maxDefined  } = this.getUserBounds();
          let min = this.min;
          let max = this.max;
          const setMin = (v)=>min = minDefined ? min : v;
          const setMax = (v)=>max = maxDefined ? max : v;
          if (min === max) {
              if (min <= 0) {
                  setMin(1);
                  setMax(10);
              } else {
                  setMin(changeExponent(min, -1));
                  setMax(changeExponent(max, 1));
              }
          }
          if (min <= 0) {
              setMin(changeExponent(max, -1));
          }
          if (max <= 0) {
              setMax(changeExponent(min, 1));
          }
          this.min = min;
          this.max = max;
      }
      buildTicks() {
          const opts = this.options;
          const generationOptions = {
              min: this._userMin,
              max: this._userMax
          };
          const ticks = generateTicks(generationOptions, this);
          if (opts.bounds === 'ticks') {
              _setMinAndMaxByKey(ticks, this, 'value');
          }
          if (opts.reverse) {
              ticks.reverse();
              this.start = this.max;
              this.end = this.min;
          } else {
              this.start = this.min;
              this.end = this.max;
          }
          return ticks;
      }
   getLabelForValue(value) {
          return value === undefined ? '0' : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
      }
   configure() {
          const start = this.min;
          super.configure();
          this._startValue = log10(start);
          this._valueRange = log10(this.max) - log10(start);
      }
      getPixelForValue(value) {
          if (value === undefined || value === 0) {
              value = this.min;
          }
          if (value === null || isNaN(value)) {
              return NaN;
          }
          return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
      }
      getValueForPixel(pixel) {
          const decimal = this.getDecimalForPixel(pixel);
          return Math.pow(10, this._startValue + decimal * this._valueRange);
      }
  }

  function getTickBackdropHeight(opts) {
      const tickOpts = opts.ticks;
      if (tickOpts.display && opts.display) {
          const padding = toPadding(tickOpts.backdropPadding);
          return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
      }
      return 0;
  }
  function measureLabelSize(ctx, font, label) {
      label = isArray(label) ? label : [
          label
      ];
      return {
          w: _longestText(ctx, font.string, label),
          h: label.length * font.lineHeight
      };
  }
  function determineLimits(angle, pos, size, min, max) {
      if (angle === min || angle === max) {
          return {
              start: pos - size / 2,
              end: pos + size / 2
          };
      } else if (angle < min || angle > max) {
          return {
              start: pos - size,
              end: pos
          };
      }
      return {
          start: pos,
          end: pos + size
      };
  }
   function fitWithPointLabels(scale) {
      const orig = {
          l: scale.left + scale._padding.left,
          r: scale.right - scale._padding.right,
          t: scale.top + scale._padding.top,
          b: scale.bottom - scale._padding.bottom
      };
      const limits = Object.assign({}, orig);
      const labelSizes = [];
      const padding = [];
      const valueCount = scale._pointLabels.length;
      const pointLabelOpts = scale.options.pointLabels;
      const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
      for(let i = 0; i < valueCount; i++){
          const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
          padding[i] = opts.padding;
          const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
          const plFont = toFont(opts.font);
          const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
          labelSizes[i] = textSize;
          const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
          const angle = Math.round(toDegrees(angleRadians));
          const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
          const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
          updateLimits(limits, orig, angleRadians, hLimits, vLimits);
      }
      scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
      scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
  }
  function updateLimits(limits, orig, angle, hLimits, vLimits) {
      const sin = Math.abs(Math.sin(angle));
      const cos = Math.abs(Math.cos(angle));
      let x = 0;
      let y = 0;
      if (hLimits.start < orig.l) {
          x = (orig.l - hLimits.start) / sin;
          limits.l = Math.min(limits.l, orig.l - x);
      } else if (hLimits.end > orig.r) {
          x = (hLimits.end - orig.r) / sin;
          limits.r = Math.max(limits.r, orig.r + x);
      }
      if (vLimits.start < orig.t) {
          y = (orig.t - vLimits.start) / cos;
          limits.t = Math.min(limits.t, orig.t - y);
      } else if (vLimits.end > orig.b) {
          y = (vLimits.end - orig.b) / cos;
          limits.b = Math.max(limits.b, orig.b + y);
      }
  }
  function createPointLabelItem(scale, index, itemOpts) {
      const outerDistance = scale.drawingArea;
      const { extra , additionalAngle , padding , size  } = itemOpts;
      const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
      const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
      const y = yForAngle(pointLabelPosition.y, size.h, angle);
      const textAlign = getTextAlignForAngle(angle);
      const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
      return {
          visible: true,
          x: pointLabelPosition.x,
          y,
          textAlign,
          left,
          top: y,
          right: left + size.w,
          bottom: y + size.h
      };
  }
  function isNotOverlapped(item, area) {
      if (!area) {
          return true;
      }
      const { left , top , right , bottom  } = item;
      const apexesInArea = _isPointInArea({
          x: left,
          y: top
      }, area) || _isPointInArea({
          x: left,
          y: bottom
      }, area) || _isPointInArea({
          x: right,
          y: top
      }, area) || _isPointInArea({
          x: right,
          y: bottom
      }, area);
      return !apexesInArea;
  }
  function buildPointLabelItems(scale, labelSizes, padding) {
      const items = [];
      const valueCount = scale._pointLabels.length;
      const opts = scale.options;
      const { centerPointLabels , display  } = opts.pointLabels;
      const itemOpts = {
          extra: getTickBackdropHeight(opts) / 2,
          additionalAngle: centerPointLabels ? PI / valueCount : 0
      };
      let area;
      for(let i = 0; i < valueCount; i++){
          itemOpts.padding = padding[i];
          itemOpts.size = labelSizes[i];
          const item = createPointLabelItem(scale, i, itemOpts);
          items.push(item);
          if (display === 'auto') {
              item.visible = isNotOverlapped(item, area);
              if (item.visible) {
                  area = item;
              }
          }
      }
      return items;
  }
  function getTextAlignForAngle(angle) {
      if (angle === 0 || angle === 180) {
          return 'center';
      } else if (angle < 180) {
          return 'left';
      }
      return 'right';
  }
  function leftForTextAlign(x, w, align) {
      if (align === 'right') {
          x -= w;
      } else if (align === 'center') {
          x -= w / 2;
      }
      return x;
  }
  function yForAngle(y, h, angle) {
      if (angle === 90 || angle === 270) {
          y -= h / 2;
      } else if (angle > 270 || angle < 90) {
          y -= h;
      }
      return y;
  }
  function drawPointLabelBox(ctx, opts, item) {
      const { left , top , right , bottom  } = item;
      const { backdropColor  } = opts;
      if (!isNullOrUndef(backdropColor)) {
          const borderRadius = toTRBLCorners(opts.borderRadius);
          const padding = toPadding(opts.backdropPadding);
          ctx.fillStyle = backdropColor;
          const backdropLeft = left - padding.left;
          const backdropTop = top - padding.top;
          const backdropWidth = right - left + padding.width;
          const backdropHeight = bottom - top + padding.height;
          if (Object.values(borderRadius).some((v)=>v !== 0)) {
              ctx.beginPath();
              addRoundedRectPath(ctx, {
                  x: backdropLeft,
                  y: backdropTop,
                  w: backdropWidth,
                  h: backdropHeight,
                  radius: borderRadius
              });
              ctx.fill();
          } else {
              ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
          }
      }
  }
  function drawPointLabels(scale, labelCount) {
      const { ctx , options: { pointLabels  }  } = scale;
      for(let i = labelCount - 1; i >= 0; i--){
          const item = scale._pointLabelItems[i];
          if (!item.visible) {
              continue;
          }
          const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
          drawPointLabelBox(ctx, optsAtIndex, item);
          const plFont = toFont(optsAtIndex.font);
          const { x , y , textAlign  } = item;
          renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
              color: optsAtIndex.color,
              textAlign: textAlign,
              textBaseline: 'middle'
          });
      }
  }
  function pathRadiusLine(scale, radius, circular, labelCount) {
      const { ctx  } = scale;
      if (circular) {
          ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
      } else {
          let pointPosition = scale.getPointPosition(0, radius);
          ctx.moveTo(pointPosition.x, pointPosition.y);
          for(let i = 1; i < labelCount; i++){
              pointPosition = scale.getPointPosition(i, radius);
              ctx.lineTo(pointPosition.x, pointPosition.y);
          }
      }
  }
  function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
      const ctx = scale.ctx;
      const circular = gridLineOpts.circular;
      const { color , lineWidth  } = gridLineOpts;
      if (!circular && !labelCount || !color || !lineWidth || radius < 0) {
          return;
      }
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(borderOpts.dash || []);
      ctx.lineDashOffset = borderOpts.dashOffset;
      ctx.beginPath();
      pathRadiusLine(scale, radius, circular, labelCount);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
  }
  function createPointLabelContext(parent, index, label) {
      return createContext(parent, {
          label,
          index,
          type: 'pointLabel'
      });
  }
  class RadialLinearScale extends LinearScaleBase {
      static id = 'radialLinear';
   static defaults = {
          display: true,
          animate: true,
          position: 'chartArea',
          angleLines: {
              display: true,
              lineWidth: 1,
              borderDash: [],
              borderDashOffset: 0.0
          },
          grid: {
              circular: false
          },
          startAngle: 0,
          ticks: {
              showLabelBackdrop: true,
              callback: Ticks.formatters.numeric
          },
          pointLabels: {
              backdropColor: undefined,
              backdropPadding: 2,
              display: true,
              font: {
                  size: 10
              },
              callback (label) {
                  return label;
              },
              padding: 5,
              centerPointLabels: false
          }
      };
      static defaultRoutes = {
          'angleLines.color': 'borderColor',
          'pointLabels.color': 'color',
          'ticks.color': 'color'
      };
      static descriptors = {
          angleLines: {
              _fallback: 'grid'
          }
      };
      constructor(cfg){
          super(cfg);
           this.xCenter = undefined;
           this.yCenter = undefined;
           this.drawingArea = undefined;
           this._pointLabels = [];
          this._pointLabelItems = [];
      }
      setDimensions() {
          const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
          const w = this.width = this.maxWidth - padding.width;
          const h = this.height = this.maxHeight - padding.height;
          this.xCenter = Math.floor(this.left + w / 2 + padding.left);
          this.yCenter = Math.floor(this.top + h / 2 + padding.top);
          this.drawingArea = Math.floor(Math.min(w, h) / 2);
      }
      determineDataLimits() {
          const { min , max  } = this.getMinMax(false);
          this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
          this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
          this.handleTickRangeOptions();
      }
   computeTickLimit() {
          return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
      }
      generateTickLabels(ticks) {
          LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
          this._pointLabels = this.getLabels().map((value, index)=>{
              const label = callback(this.options.pointLabels.callback, [
                  value,
                  index
              ], this);
              return label || label === 0 ? label : '';
          }).filter((v, i)=>this.chart.getDataVisibility(i));
      }
      fit() {
          const opts = this.options;
          if (opts.display && opts.pointLabels.display) {
              fitWithPointLabels(this);
          } else {
              this.setCenterPoint(0, 0, 0, 0);
          }
      }
      setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
          this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
          this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
          this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
      }
      getIndexAngle(index) {
          const angleMultiplier = TAU / (this._pointLabels.length || 1);
          const startAngle = this.options.startAngle || 0;
          return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
      }
      getDistanceFromCenterForValue(value) {
          if (isNullOrUndef(value)) {
              return NaN;
          }
          const scalingFactor = this.drawingArea / (this.max - this.min);
          if (this.options.reverse) {
              return (this.max - value) * scalingFactor;
          }
          return (value - this.min) * scalingFactor;
      }
      getValueForDistanceFromCenter(distance) {
          if (isNullOrUndef(distance)) {
              return NaN;
          }
          const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
          return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
      }
      getPointLabelContext(index) {
          const pointLabels = this._pointLabels || [];
          if (index >= 0 && index < pointLabels.length) {
              const pointLabel = pointLabels[index];
              return createPointLabelContext(this.getContext(), index, pointLabel);
          }
      }
      getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
          const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
          return {
              x: Math.cos(angle) * distanceFromCenter + this.xCenter,
              y: Math.sin(angle) * distanceFromCenter + this.yCenter,
              angle
          };
      }
      getPointPositionForValue(index, value) {
          return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
      }
      getBasePosition(index) {
          return this.getPointPositionForValue(index || 0, this.getBaseValue());
      }
      getPointLabelPosition(index) {
          const { left , top , right , bottom  } = this._pointLabelItems[index];
          return {
              left,
              top,
              right,
              bottom
          };
      }
   drawBackground() {
          const { backgroundColor , grid: { circular  }  } = this.options;
          if (backgroundColor) {
              const ctx = this.ctx;
              ctx.save();
              ctx.beginPath();
              pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
              ctx.closePath();
              ctx.fillStyle = backgroundColor;
              ctx.fill();
              ctx.restore();
          }
      }
   drawGrid() {
          const ctx = this.ctx;
          const opts = this.options;
          const { angleLines , grid , border  } = opts;
          const labelCount = this._pointLabels.length;
          let i, offset, position;
          if (opts.pointLabels.display) {
              drawPointLabels(this, labelCount);
          }
          if (grid.display) {
              this.ticks.forEach((tick, index)=>{
                  if (index !== 0 || index === 0 && this.min < 0) {
                      offset = this.getDistanceFromCenterForValue(tick.value);
                      const context = this.getContext(index);
                      const optsAtIndex = grid.setContext(context);
                      const optsAtIndexBorder = border.setContext(context);
                      drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
                  }
              });
          }
          if (angleLines.display) {
              ctx.save();
              for(i = labelCount - 1; i >= 0; i--){
                  const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                  const { color , lineWidth  } = optsAtIndex;
                  if (!lineWidth || !color) {
                      continue;
                  }
                  ctx.lineWidth = lineWidth;
                  ctx.strokeStyle = color;
                  ctx.setLineDash(optsAtIndex.borderDash);
                  ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                  offset = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
                  position = this.getPointPosition(i, offset);
                  ctx.beginPath();
                  ctx.moveTo(this.xCenter, this.yCenter);
                  ctx.lineTo(position.x, position.y);
                  ctx.stroke();
              }
              ctx.restore();
          }
      }
   drawBorder() {}
   drawLabels() {
          const ctx = this.ctx;
          const opts = this.options;
          const tickOpts = opts.ticks;
          if (!tickOpts.display) {
              return;
          }
          const startAngle = this.getIndexAngle(0);
          let offset, width;
          ctx.save();
          ctx.translate(this.xCenter, this.yCenter);
          ctx.rotate(startAngle);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          this.ticks.forEach((tick, index)=>{
              if (index === 0 && this.min >= 0 && !opts.reverse) {
                  return;
              }
              const optsAtIndex = tickOpts.setContext(this.getContext(index));
              const tickFont = toFont(optsAtIndex.font);
              offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
              if (optsAtIndex.showLabelBackdrop) {
                  ctx.font = tickFont.string;
                  width = ctx.measureText(tick.label).width;
                  ctx.fillStyle = optsAtIndex.backdropColor;
                  const padding = toPadding(optsAtIndex.backdropPadding);
                  ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
              }
              renderText(ctx, tick.label, 0, -offset, tickFont, {
                  color: optsAtIndex.color,
                  strokeColor: optsAtIndex.textStrokeColor,
                  strokeWidth: optsAtIndex.textStrokeWidth
              });
          });
          ctx.restore();
      }
   drawTitle() {}
  }

  const INTERVALS = {
      millisecond: {
          common: true,
          size: 1,
          steps: 1000
      },
      second: {
          common: true,
          size: 1000,
          steps: 60
      },
      minute: {
          common: true,
          size: 60000,
          steps: 60
      },
      hour: {
          common: true,
          size: 3600000,
          steps: 24
      },
      day: {
          common: true,
          size: 86400000,
          steps: 30
      },
      week: {
          common: false,
          size: 604800000,
          steps: 4
      },
      month: {
          common: true,
          size: 2.628e9,
          steps: 12
      },
      quarter: {
          common: false,
          size: 7.884e9,
          steps: 4
      },
      year: {
          common: true,
          size: 3.154e10
      }
  };
   const UNITS =  /* #__PURE__ */ Object.keys(INTERVALS);
   function sorter(a, b) {
      return a - b;
  }
   function parse(scale, input) {
      if (isNullOrUndef(input)) {
          return null;
      }
      const adapter = scale._adapter;
      const { parser , round , isoWeekday  } = scale._parseOpts;
      let value = input;
      if (typeof parser === 'function') {
          value = parser(value);
      }
      if (!isNumberFinite(value)) {
          value = typeof parser === 'string' ? adapter.parse(value, parser) : adapter.parse(value);
      }
      if (value === null) {
          return null;
      }
      if (round) {
          value = round === 'week' && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, 'isoWeek', isoWeekday) : adapter.startOf(value, round);
      }
      return +value;
  }
   function determineUnitForAutoTicks(minUnit, min, max, capacity) {
      const ilen = UNITS.length;
      for(let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i){
          const interval = INTERVALS[UNITS[i]];
          const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
          if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
              return UNITS[i];
          }
      }
      return UNITS[ilen - 1];
  }
   function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
      for(let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--){
          const unit = UNITS[i];
          if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
              return unit;
          }
      }
      return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
  }
   function determineMajorUnit(unit) {
      for(let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i){
          if (INTERVALS[UNITS[i]].common) {
              return UNITS[i];
          }
      }
  }
   function addTick(ticks, time, timestamps) {
      if (!timestamps) {
          ticks[time] = true;
      } else if (timestamps.length) {
          const { lo , hi  } = _lookup(timestamps, time);
          const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
          ticks[timestamp] = true;
      }
  }
   function setMajorTicks(scale, ticks, map, majorUnit) {
      const adapter = scale._adapter;
      const first = +adapter.startOf(ticks[0].value, majorUnit);
      const last = ticks[ticks.length - 1].value;
      let major, index;
      for(major = first; major <= last; major = +adapter.add(major, 1, majorUnit)){
          index = map[major];
          if (index >= 0) {
              ticks[index].major = true;
          }
      }
      return ticks;
  }
   function ticksFromTimestamps(scale, values, majorUnit) {
      const ticks = [];
       const map = {};
      const ilen = values.length;
      let i, value;
      for(i = 0; i < ilen; ++i){
          value = values[i];
          map[value] = i;
          ticks.push({
              value,
              major: false
          });
      }
      return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
  }
  class TimeScale extends Scale {
      static id = 'time';
   static defaults = {
   bounds: 'data',
          adapters: {},
          time: {
              parser: false,
              unit: false,
              round: false,
              isoWeekday: false,
              minUnit: 'millisecond',
              displayFormats: {}
          },
          ticks: {
   source: 'auto',
              callback: false,
              major: {
                  enabled: false
              }
          }
      };
   constructor(props){
          super(props);
           this._cache = {
              data: [],
              labels: [],
              all: []
          };
           this._unit = 'day';
           this._majorUnit = undefined;
          this._offsets = {};
          this._normalized = false;
          this._parseOpts = undefined;
      }
      init(scaleOpts, opts = {}) {
          const time = scaleOpts.time || (scaleOpts.time = {});
           const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
          adapter.init(opts);
          mergeIf(time.displayFormats, adapter.formats());
          this._parseOpts = {
              parser: time.parser,
              round: time.round,
              isoWeekday: time.isoWeekday
          };
          super.init(scaleOpts);
          this._normalized = opts.normalized;
      }
   parse(raw, index) {
          if (raw === undefined) {
              return null;
          }
          return parse(this, raw);
      }
      beforeLayout() {
          super.beforeLayout();
          this._cache = {
              data: [],
              labels: [],
              all: []
          };
      }
      determineDataLimits() {
          const options = this.options;
          const adapter = this._adapter;
          const unit = options.time.unit || 'day';
          let { min , max , minDefined , maxDefined  } = this.getUserBounds();
   function _applyBounds(bounds) {
              if (!minDefined && !isNaN(bounds.min)) {
                  min = Math.min(min, bounds.min);
              }
              if (!maxDefined && !isNaN(bounds.max)) {
                  max = Math.max(max, bounds.max);
              }
          }
          if (!minDefined || !maxDefined) {
              _applyBounds(this._getLabelBounds());
              if (options.bounds !== 'ticks' || options.ticks.source !== 'labels') {
                  _applyBounds(this.getMinMax(false));
              }
          }
          min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
          max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
          this.min = Math.min(min, max - 1);
          this.max = Math.max(min + 1, max);
      }
   _getLabelBounds() {
          const arr = this.getLabelTimestamps();
          let min = Number.POSITIVE_INFINITY;
          let max = Number.NEGATIVE_INFINITY;
          if (arr.length) {
              min = arr[0];
              max = arr[arr.length - 1];
          }
          return {
              min,
              max
          };
      }
   buildTicks() {
          const options = this.options;
          const timeOpts = options.time;
          const tickOpts = options.ticks;
          const timestamps = tickOpts.source === 'labels' ? this.getLabelTimestamps() : this._generate();
          if (options.bounds === 'ticks' && timestamps.length) {
              this.min = this._userMin || timestamps[0];
              this.max = this._userMax || timestamps[timestamps.length - 1];
          }
          const min = this.min;
          const max = this.max;
          const ticks = _filterBetween(timestamps, min, max);
          this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
          this._majorUnit = !tickOpts.major.enabled || this._unit === 'year' ? undefined : determineMajorUnit(this._unit);
          this.initOffsets(timestamps);
          if (options.reverse) {
              ticks.reverse();
          }
          return ticksFromTimestamps(this, ticks, this._majorUnit);
      }
      afterAutoSkip() {
          if (this.options.offsetAfterAutoskip) {
              this.initOffsets(this.ticks.map((tick)=>+tick.value));
          }
      }
   initOffsets(timestamps = []) {
          let start = 0;
          let end = 0;
          let first, last;
          if (this.options.offset && timestamps.length) {
              first = this.getDecimalForValue(timestamps[0]);
              if (timestamps.length === 1) {
                  start = 1 - first;
              } else {
                  start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
              }
              last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
              if (timestamps.length === 1) {
                  end = last;
              } else {
                  end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
              }
          }
          const limit = timestamps.length < 3 ? 0.5 : 0.25;
          start = _limitValue(start, 0, limit);
          end = _limitValue(end, 0, limit);
          this._offsets = {
              start,
              end,
              factor: 1 / (start + 1 + end)
          };
      }
   _generate() {
          const adapter = this._adapter;
          const min = this.min;
          const max = this.max;
          const options = this.options;
          const timeOpts = options.time;
          const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
          const stepSize = valueOrDefault(options.ticks.stepSize, 1);
          const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
          const hasWeekday = isNumber(weekday) || weekday === true;
          const ticks = {};
          let first = min;
          let time, count;
          if (hasWeekday) {
              first = +adapter.startOf(first, 'isoWeek', weekday);
          }
          first = +adapter.startOf(first, hasWeekday ? 'day' : minor);
          if (adapter.diff(max, min, minor) > 100000 * stepSize) {
              throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
          }
          const timestamps = options.ticks.source === 'data' && this.getDataTimestamps();
          for(time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++){
              addTick(ticks, time, timestamps);
          }
          if (time === max || options.bounds === 'ticks' || count === 1) {
              addTick(ticks, time, timestamps);
          }
          return Object.keys(ticks).sort(sorter).map((x)=>+x);
      }
   getLabelForValue(value) {
          const adapter = this._adapter;
          const timeOpts = this.options.time;
          if (timeOpts.tooltipFormat) {
              return adapter.format(value, timeOpts.tooltipFormat);
          }
          return adapter.format(value, timeOpts.displayFormats.datetime);
      }
   format(value, format) {
          const options = this.options;
          const formats = options.time.displayFormats;
          const unit = this._unit;
          const fmt = format || formats[unit];
          return this._adapter.format(value, fmt);
      }
   _tickFormatFunction(time, index, ticks, format) {
          const options = this.options;
          const formatter = options.ticks.callback;
          if (formatter) {
              return callback(formatter, [
                  time,
                  index,
                  ticks
              ], this);
          }
          const formats = options.time.displayFormats;
          const unit = this._unit;
          const majorUnit = this._majorUnit;
          const minorFormat = unit && formats[unit];
          const majorFormat = majorUnit && formats[majorUnit];
          const tick = ticks[index];
          const major = majorUnit && majorFormat && tick && tick.major;
          return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
      }
   generateTickLabels(ticks) {
          let i, ilen, tick;
          for(i = 0, ilen = ticks.length; i < ilen; ++i){
              tick = ticks[i];
              tick.label = this._tickFormatFunction(tick.value, i, ticks);
          }
      }
   getDecimalForValue(value) {
          return value === null ? NaN : (value - this.min) / (this.max - this.min);
      }
   getPixelForValue(value) {
          const offsets = this._offsets;
          const pos = this.getDecimalForValue(value);
          return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
      }
   getValueForPixel(pixel) {
          const offsets = this._offsets;
          const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
          return this.min + pos * (this.max - this.min);
      }
   _getLabelSize(label) {
          const ticksOpts = this.options.ticks;
          const tickLabelWidth = this.ctx.measureText(label).width;
          const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
          const cosRotation = Math.cos(angle);
          const sinRotation = Math.sin(angle);
          const tickFontSize = this._resolveTickFontOptions(0).size;
          return {
              w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
              h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
          };
      }
   _getLabelCapacity(exampleTime) {
          const timeOpts = this.options.time;
          const displayFormats = timeOpts.displayFormats;
          const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
          const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
              exampleTime
          ], this._majorUnit), format);
          const size = this._getLabelSize(exampleLabel);
          const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
          return capacity > 0 ? capacity : 1;
      }
   getDataTimestamps() {
          let timestamps = this._cache.data || [];
          let i, ilen;
          if (timestamps.length) {
              return timestamps;
          }
          const metas = this.getMatchingVisibleMetas();
          if (this._normalized && metas.length) {
              return this._cache.data = metas[0].controller.getAllParsedValues(this);
          }
          for(i = 0, ilen = metas.length; i < ilen; ++i){
              timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
          }
          return this._cache.data = this.normalize(timestamps);
      }
   getLabelTimestamps() {
          const timestamps = this._cache.labels || [];
          let i, ilen;
          if (timestamps.length) {
              return timestamps;
          }
          const labels = this.getLabels();
          for(i = 0, ilen = labels.length; i < ilen; ++i){
              timestamps.push(parse(this, labels[i]));
          }
          return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
      }
   normalize(values) {
          return _arrayUnique(values.sort(sorter));
      }
  }

  function interpolate(table, val, reverse) {
      let lo = 0;
      let hi = table.length - 1;
      let prevSource, nextSource, prevTarget, nextTarget;
      if (reverse) {
          if (val >= table[lo].pos && val <= table[hi].pos) {
              ({ lo , hi  } = _lookupByKey(table, 'pos', val));
          }
          ({ pos: prevSource , time: prevTarget  } = table[lo]);
          ({ pos: nextSource , time: nextTarget  } = table[hi]);
      } else {
          if (val >= table[lo].time && val <= table[hi].time) {
              ({ lo , hi  } = _lookupByKey(table, 'time', val));
          }
          ({ time: prevSource , pos: prevTarget  } = table[lo]);
          ({ time: nextSource , pos: nextTarget  } = table[hi]);
      }
      const span = nextSource - prevSource;
      return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
  }
  class TimeSeriesScale extends TimeScale {
      static id = 'timeseries';
   static defaults = TimeScale.defaults;
   constructor(props){
          super(props);
           this._table = [];
           this._minPos = undefined;
           this._tableRange = undefined;
      }
   initOffsets() {
          const timestamps = this._getTimestampsForTable();
          const table = this._table = this.buildLookupTable(timestamps);
          this._minPos = interpolate(table, this.min);
          this._tableRange = interpolate(table, this.max) - this._minPos;
          super.initOffsets(timestamps);
      }
   buildLookupTable(timestamps) {
          const { min , max  } = this;
          const items = [];
          const table = [];
          let i, ilen, prev, curr, next;
          for(i = 0, ilen = timestamps.length; i < ilen; ++i){
              curr = timestamps[i];
              if (curr >= min && curr <= max) {
                  items.push(curr);
              }
          }
          if (items.length < 2) {
              return [
                  {
                      time: min,
                      pos: 0
                  },
                  {
                      time: max,
                      pos: 1
                  }
              ];
          }
          for(i = 0, ilen = items.length; i < ilen; ++i){
              next = items[i + 1];
              prev = items[i - 1];
              curr = items[i];
              if (Math.round((next + prev) / 2) !== curr) {
                  table.push({
                      time: curr,
                      pos: i / (ilen - 1)
                  });
              }
          }
          return table;
      }
   _generate() {
          const min = this.min;
          const max = this.max;
          let timestamps = super.getDataTimestamps();
          if (!timestamps.includes(min) || !timestamps.length) {
              timestamps.splice(0, 0, min);
          }
          if (!timestamps.includes(max) || timestamps.length === 1) {
              timestamps.push(max);
          }
          return timestamps.sort((a, b)=>a - b);
      }
   _getTimestampsForTable() {
          let timestamps = this._cache.all || [];
          if (timestamps.length) {
              return timestamps;
          }
          const data = this.getDataTimestamps();
          const label = this.getLabelTimestamps();
          if (data.length && label.length) {
              timestamps = this.normalize(data.concat(label));
          } else {
              timestamps = data.length ? data : label;
          }
          timestamps = this._cache.all = timestamps;
          return timestamps;
      }
   getDecimalForValue(value) {
          return (interpolate(this._table, value) - this._minPos) / this._tableRange;
      }
   getValueForPixel(pixel) {
          const offsets = this._offsets;
          const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
          return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
      }
  }

  var scales = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CategoryScale: CategoryScale,
  LinearScale: LinearScale,
  LogarithmicScale: LogarithmicScale,
  RadialLinearScale: RadialLinearScale,
  TimeScale: TimeScale,
  TimeSeriesScale: TimeSeriesScale
  });

  const registerables = [
      controllers,
      elements,
      plugins,
      scales
  ];

  Chart.register(...registerables);

  /*!
   * chartjs-adapter-luxon v1.3.1
   * https://www.chartjs.org
   * (c) 2023 chartjs-adapter-luxon Contributors
   * Released under the MIT license
   */

  const FORMATS = {
    datetime: DateTime.DATETIME_MED_WITH_SECONDS,
    millisecond: 'h:mm:ss.SSS a',
    second: DateTime.TIME_WITH_SECONDS,
    minute: DateTime.TIME_SIMPLE,
    hour: {hour: 'numeric'},
    day: {day: 'numeric', month: 'short'},
    week: 'DD',
    month: {month: 'short', year: 'numeric'},
    quarter: "'Q'q - yyyy",
    year: {year: 'numeric'}
  };

  adapters._date.override({
    _id: 'luxon', // DEBUG

    /**
     * @private
     */
    _create: function(time) {
      return DateTime.fromMillis(time, this.options);
    },

    init(chartOptions) {
      if (!this.options.locale) {
        this.options.locale = chartOptions.locale;
      }
    },

    formats: function() {
      return FORMATS;
    },

    parse: function(value, format) {
      const options = this.options;

      const type = typeof value;
      if (value === null || type === 'undefined') {
        return null;
      }

      if (type === 'number') {
        value = this._create(value);
      } else if (type === 'string') {
        if (typeof format === 'string') {
          value = DateTime.fromFormat(value, format, options);
        } else {
          value = DateTime.fromISO(value, options);
        }
      } else if (value instanceof Date) {
        value = DateTime.fromJSDate(value, options);
      } else if (type === 'object' && !(value instanceof DateTime)) {
        value = DateTime.fromObject(value, options);
      }

      return value.isValid ? value.valueOf() : null;
    },

    format: function(time, format) {
      const datetime = this._create(time);
      return typeof format === 'string'
        ? datetime.toFormat(format)
        : datetime.toLocaleString(format);
    },

    add: function(time, amount, unit) {
      const args = {};
      args[unit] = amount;
      return this._create(time).plus(args).valueOf();
    },

    diff: function(max, min, unit) {
      return this._create(max).diff(this._create(min)).as(unit).valueOf();
    },

    startOf: function(time, unit, weekday) {
      if (unit === 'isoWeek') {
        weekday = Math.trunc(Math.min(Math.max(0, weekday), 6));
        const dateTime = this._create(time);
        return dateTime.minus({days: (dateTime.weekday - weekday + 7) % 7}).startOf('day').valueOf();
      }
      return unit ? this._create(time).startOf(unit).valueOf() : time;
    },

    endOf: function(time, unit) {
      return this._create(time).endOf(unit).valueOf();
    }
  });

  class DrowChart {
      canvas;
      daysDate;
      gradient;
      static halfDayOffset = { hour: 12 };
      constructor(canvas, daysData) {
          this.canvas = canvas;
          this.daysDate = daysData;
          var ctx = this.canvas.getContext("2d");
          this.gradient = ctx.createLinearGradient(0, 0, 0, 400); // вертикальный градиент
          this.gradient.addColorStop(0, "rgba(210, 180, 140, 0.75)"); // сверху — полупрозрачный зеленый
          this.gradient.addColorStop(1, "rgba(116, 158, 98, 0)"); // снизу — прозрачный
      }
      daysStartWork() {
          var data = this.daysDate.map((day) => {
              var first = undefined;
              var ranges = day.mergedRanges;
              for (var i = 0; i < ranges.length; i++) {
                  if (ranges[i].begin !== undefined) {
                      first = ranges[i];
                      break;
                  }
              }
              return {
                  y: first?.begin?.minus(day.date.toMillis()),
                  x: day.date.plus(DrowChart.halfDayOffset).toISO(),
              };
          });
          return data;
      }
      daysEndWork() {
          var data = this.daysDate.map((day) => {
              var last = undefined;
              var ranges = day.mergedRanges;
              for (var i = ranges.length - 1; i >= 0; i--) {
                  if (ranges[i].end !== undefined) {
                      last = ranges[i];
                      break;
                  }
              }
              return {
                  y: last?.end?.minus(day.date.toMillis()),
                  x: day.date.plus(DrowChart.halfDayOffset).toISO(),
              };
          });
          return data;
      }
      recomendedStartWork() {
          var data = this.daysDate.map((day) => {
              return {
                  y: day.date.plus({ hour: 10 }).minus(day.date.toMillis()),
                  x: day.date.plus(DrowChart.halfDayOffset).toISO(),
              };
          });
          return data;
      }
      recomendedEndWork() {
          var data = this.daysDate.map((day) => {
              return {
                  y: day.date.plus({ hour: 17 }).minus(day.date.toMillis()),
                  x: day.date.plus(DrowChart.halfDayOffset).toISO(),
              };
          });
          return data;
      }
      drow() {
          new Chart(this.canvas, {
              type: "line",
              data: {
                  datasets: [
                      {
                          label: "Рекомендуемое начало рабочего дня",
                          data: this.recomendedStartWork(),
                          borderColor: "rgba(100, 196, 58, 0.3)",
                          pointRadius: 0,
                          pointHoverRadius: 0,
                          pointHitRadius: 0,
                      },
                      {
                          label: "Рекомендуемый конец рабочего дня",
                          data: this.recomendedEndWork(),
                          borderColor: "rgba(212, 136, 35, 0.3)",
                          pointRadius: 0,
                          pointHoverRadius: 0,
                          pointHitRadius: 0,
                      },
                      {
                          label: "Начало рабочего дня",
                          data: this.daysStartWork(),
                          fill: "+1",
                          backgroundColor: this.gradient,
                          borderColor: "rgb(116, 158, 98)",
                          tension: 0.2,
                      },
                      {
                          label: "Конец рабочего дня",
                          data: this.daysEndWork(),
                          fill: false,
                          borderColor: "rgb(210, 180, 140)",
                          tension: 0.2,
                      },
                  ],
              },
              options: {
                  scales: {
                      x: {
                          adapters: {
                              date: {
                                  zone: "UTC+3",
                                  setZone: true,
                              },
                          },
                          type: "time",
                          time: {
                              unit: "day",
                              displayFormats: {
                                  day: "dd.MM",
                              },
                          },
                          title: {
                              display: true,
                              text: "Дата",
                          },
                      },
                      y: {
                          adapters: {
                              date: {
                                  zone: "UTC",
                                  setZone: true,
                              },
                          },
                          type: "time",
                          time: {
                              unit: "hour",
                              displayFormats: {
                                  hour: "HH:mm",
                              },
                              tooltipFormat: "HH:mm",
                          },
                          title: {
                              display: true,
                              text: "Время",
                          },
                      },
                  },
              },
          });
      }
  }

  console.log("Hello user!");
  function GetFilterDate() {
      return DateTime.fromObject({
          year: Number(document.querySelector("#Year").value),
          month: Number(document.querySelector("#Month").value),
      });
  }
  class CRME {
      monthInfo;
      constructor() { }
      async init() {
          var table = (await waitForElm("#MainDiv > table"));
          var filterDate = GetFilterDate();
          this.monthInfo = new MonthInfo(table, filterDate);
          var workDaysTracker = await waitForElm("#MainDiv > .crm-tooltip");
          var workingDaysCount = this.monthInfo.WorkingDaysToday.length;
          var expectedOperating = Duration.fromObject({ hour: workingDaysCount * 8 });
          var totalDelta = this.monthInfo.TotalWorkDuration.minus(expectedOperating);
          var totalDeltaTimePrefix = totalDelta.toMillis() < 0 ? "Недоработка" : "Переработка";
          console.log(totalDeltaTimePrefix, abs(totalDelta).toFormat("hh:mm"));
          console.log(DateTime.now().zone);
          var totalDeltaElement = document.createElement("span");
          totalDeltaElement.textContent = `(${totalDeltaTimePrefix}: ${abs(totalDelta).toFormat("hh:mm")})`;
          totalDeltaElement.setAttribute("style", "color: #aaa; font-size: 0.8em;");
          workDaysTracker.appendChild(totalDeltaElement);
          var chartDiv = document.createElement("div");
          chartDiv.setAttribute("style", "width: 800px; height: 400px;");
          var canvas = document.createElement("canvas");
          chartDiv.appendChild(canvas);
          (await waitForElm("#MainDiv")).append(chartDiv);
          new DrowChart(canvas, this.monthInfo.days).drow();
      }
      dump = () => {
          return JSON.stringify(this.monthInfo);
      };
  }
  async function init() {
      const filter = (await waitForElm("#filtersRow"));
      var crme = new CRME();
      filter.addEventListener("change", (event) => {
          const target = event.target;
          if (target && target.tagName === "SELECT") {
              crme.init();
              console.log(crme);
          }
      });
      crme.init();
      console.log(crme);
      window.addEventListener("message", (event) => {
          if (event.source !== window)
              return;
          if (event.data.type === "CRMEDump_CALL") {
              console.log("Method called via postMessage");
              console.log(crme.dump());
              // можно ответить
              window.postMessage({ type: "CRMEDump_RESPONSE", data: "ok" }, "*");
          }
      });
  }
  init();

})();

class TempEffectsAsStatuses {
  static MODULE_NAME = "temp-effects-as-statuses";
  static MODULE_TITLE = "Temporary Effects as Token Statuses";

  static SETTINGS = {
    toggleDelete: 'toggle-delete',
  }

  static log(...args) {
    if (game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_NAME)) {
      console.log(this.MODULE_TITLE, '|', ...args);
    }
  }

  static registerSettings() {
    game.settings.register(this.MODULE_NAME, this.SETTINGS.toggleDelete, {
      name: `${this.MODULE_NAME}.settings.${this.SETTINGS.toggleDelete}.name`,
      hint: `${this.MODULE_NAME}.settings.${this.SETTINGS.toggleDelete}.hint`,
      config: true,
      scope: 'world',
      default: false,
      type: Boolean,
    })
  }
}

Hooks.on('init', () => {
  console.log(`${TempEffectsAsStatuses.MODULE_NAME} | Initializing ${TempEffectsAsStatuses.MODULE_TITLE}`);
  TempEffectsAsStatusesTokenHUD.init();
  TempEffectsAsStatuses.registerSettings();
})

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(TempEffectsAsStatuses.MODULE_NAME);
});

Hooks.on('renderTokenHUD', (tokenHudApp, html, applicationData) => {
  if (!tokenHudApp.object) {
    return;
  }

  const statusEffects = html.find('.status-effects');

  // filter out temporary effects from status icons
  const filteredEffects = tokenHudApp.object.actor.temporaryEffects.filter((effect) => {
    return !CONFIG.statusEffects.some(statusEffect => statusEffect.id === effect.data.flags?.core?.statusId)
  });

  const newEffectIcons = `
  ${filteredEffects.map(effect => `<img class="effect-control active" data-effect-uuid="${effect.uuid}" src="${effect.data.icon}" title="${effect.data.label}" data-status-id="${effect.uuid}" />`).join('')
    }
  `

  TempEffectsAsStatuses.log(filteredEffects, newEffectIcons)

  statusEffects.append(newEffectIcons);
});

class TempEffectsAsStatusesTokenHUD {
  static init() {
    libWrapper.register(TempEffectsAsStatuses.MODULE_NAME, 'TokenHUD.prototype._onToggleEffect', TempEffectsAsStatusesTokenHUD.patchToggleEffect, "MIXED");
  }

  static async patchToggleEffect(wrapped, event, config) {
    event.preventDefault();
    event.stopPropagation();
    const img = event.currentTarget;

    if (img.dataset.effectUuid) {
      return TempEffectsAsStatusesTokenHUD.toggleEffectByUuid(img.dataset.effectUuid);
    }

    return wrapped(event, config);
  }

  static async toggleEffectByUuid(effectUuid) {
    const effect = await fromUuid(effectUuid);
    const alwaysDelete = game.settings.get(TempEffectsAsStatuses.MODULE_NAME, TempEffectsAsStatuses.SETTINGS.toggleDelete);

    // nuke it if it has a statusId
    // brittle assumption
    // provides an option to always do this
    if (effect.getFlag('core', 'statusId') || alwaysDelete) {
      const deleted = await effect.delete();
      return !!deleted;
    }

    // otherwise toggle its disabled status
    const updated = await effect.update({
      disabled: !effect.data.disabled,
    });

    return !!updated;
  }
}